import psycopg2
import pandas as pd
import numpy as np
from psycopg2.extensions import register_adapter, AsIs
register_adapter(np.int64, AsIs)

# =============================================================================
# Functions
# =============================================================================
def transform_combined_table(eDSR_FILEPATH, eTSR_FILEPATH):
    # Import files
    eDSR_df = pd.read_excel(eDSR_FILEPATH, header= 2)
    eDSR_df = eDSR_df[['[SumSO]', 'DELIVERY[IND Key]', 'DELIVERY[ETA]',
                                  'DELIVERY[Order Criteria]','DELIVERY[FC Month]', 
                                  'DELIVERY[AC Month]','DELIVERY[Log PIC]','[SumREV_Usd]',
                                  '[SumGP_Usd]']]
    eDSR_df.columns = ['Sales Order', 'Client Industry Sector', 'Delivery Status', 'Delivery Order Criteria', 'Delivery FC Month', 'Delivery AC Month', 'Logistics PIC', 'Revenue', 'GP']
    
    
    eTSR_df = pd.read_excel(eTSR_FILEPATH, skiprows=[1])
    eTSR_df = eTSR_df[['Sales Order', 'Client PO Number', 'Client Name',
                                  'Project Manager','Engineer','Date Creation',
                                  'Date Closed','Service Unit', 'Business Unit',
                                  'TSR Number', 'Project ID']]
    
    # Inner join 
    combined_df = pd.merge(eDSR_df,eTSR_df, on=['Sales Order'], how='inner')
    
    
    # Transformation 
    # 1. Filter values 
    combined_df = combined_df[combined_df['Delivery Order Criteria'].isin(["Professional Service Order (only for Internal Staging)", "Bundled Order"])] 
    
    # 2. Turn blanks into nan
    combined_df = combined_df.fillna(np.nan)
    
    # 3. Remove every odd occurance of the names
    combined_df['Engineer'] = combined_df['Engineer'].apply(lambda x: x if pd.isna(x) else ', '.join(x.split(', ')[1::2]))
    combined_df['Project Manager'] = combined_df['Project Manager'].apply(lambda x: x if pd.isna(x) else ', '.join(x.split(', ')[1::2]))
    combined_df['Business Unit'] = combined_df['Business Unit'].apply(lambda x: x.replace("&amp;", "&") if isinstance(x, str) else x)
    
    # 4. Convert values into date datatyoe
    combined_df['Delivery AC Month'] = combined_df['Delivery AC Month'].dt.date # convert to none version of date
    
    combined_df['Date Creation'] = combined_df['Date Creation'].astype('datetime64[ns]')
    combined_df['Date Closed'] = combined_df['Date Closed'].astype('datetime64[ns]')
    
    combined_df['Date Creation'] = combined_df['Date Creation'].dt.date
    combined_df['Date Closed'] = combined_df['Date Closed'].dt.date
    
    # 5. Sort the columns by alphabetical
    combined_df = combined_df.reindex(sorted(combined_df.columns), axis=1)
    
    # 6. Shift SO column to the front
    combined_df = combined_df[['Sales Order'] + [ col for col in combined_df.columns if col != 'Sales Order' ]]
    
    # 7. Create 2 new columns
    combined_df["Staging Status"] = None
    combined_df["Last Status Update"] = None
    
    return eTSR_df, combined_df

def transform_engineers_table(eTSR_df):
    engineers_df = pd.DataFrame()
    engineers_df['engineers'] = pd.DataFrame(eTSR_df['Engineer'])
    
    # 1. Replace NaN with an empty string to avoid issues with split
    engineers_df['engineers'] = engineers_df['engineers'].fillna('')
    
    # 2. Split the entries by comma and space, explode the list-like values into separate rows, and strip whitespace
    engineers_df = engineers_df.assign(engineers=engineers_df['engineers'].str.split(', ')).explode('engineers')
    
    # 3. Drop rows where engineers are empty strings
    engineers_df = engineers_df[engineers_df['engineers'] != '']
    
    # 4. Sort engineer names alphabetically
    engineers_df = engineers_df.sort_values('engineers')
    
    # 5. Reset the index and remove duplicate entries
    engineers_df = engineers_df.drop_duplicates().reset_index(drop=True)
    engineers_df.columns=["name"]

    return engineers_df

def transform_staging_table(combined_df):
    staging_df = pd.DataFrame()
    staging_df = combined_df[['Sales Order', 'Engineer']]
    staging_df["Staging Status"] = "Not Yet" 
    staging_df["Date Drawn"] =  None
    staging_df["# Carton"]  = None
    staging_df["Last Status Update"]  = None

    return staging_df

def psql_establish_connection():
    # Establish a connection
    conn = psycopg2.connect(
        database = "postgres",
        user = "postgres",
        password = "postgres",
        host = "10.16.0.111",
        port = "5432"   
    )
    cursor = conn.cursor()
    
    return cursor, conn
    
def push_combined_table_to_psql(combined_df):
    cursor, conn = psql_establish_connection()
    
    sql_drop_query = "DROP TABLE IF EXISTS combined_table"
    cursor.execute(sql_drop_query)
    conn.commit()
    
    # Create table
    sql_create_query = """
    CREATE TABLE combined_table (
        sales_order TEXT NOT NULL PRIMARY KEY,
        business_unit TEXT NOT NULL,
        client_industry_sector TEXT NOT NULL,
        client_name TEXT NOT NULL,
        client_po_number TEXT NOT NULL,
        date_closed DATE ,
        date_creation DATE,
        delivery_ac_month DATE,
        delivery_fc_month TEXT,
        delivery_order_criteria TEXT NOT NULL,
        delivery_status TEXT,
        engineer TEXT,
        gp FLOAT,
        logistics_pic TEXT NOT NULL,
        project_id TEXT NOT NULL,
        project_manager TEXT,
        revenue FLOAT,
        service_unit TEXT NOT NULL,
        tsr_number TEXT,
        staging_status TEXT,
        last_status_update DATE
    )
    """
    cursor.execute(sql_create_query)
    conn.commit()
    
    
    sql_insert_query = """
    INSERT INTO combined_table (
        sales_order, business_unit, client_industry_sector, client_name, client_po_number, date_closed,
        date_creation, delivery_ac_month, delivery_fc_month, delivery_order_criteria,
        delivery_status, engineer, gp, logistics_pic, project_id, project_manager, revenue,
        service_unit, tsr_number, staging_status, last_status_update
    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    
    combined_df = combined_df.where(pd.notnull(combined_df), None)
    records = [tuple(x) for x in combined_df.to_records(index=False)]
    
    result = cursor.executemany(sql_insert_query, records)
    conn.commit()

def push_engineers_table_to_psql(engineers_df):
    cursor, conn = psql_establish_connection()
    
    sql_drop_query = "DROP TABLE IF EXISTS engineers_table"
    cursor.execute(sql_drop_query)
    conn.commit()
    
    
    # Create table
    sql_create_query = """
    CREATE TABLE engineers_table (
        name TEXT NOT NULL PRIMARY KEY
    )
    """
    
    cursor.execute(sql_create_query)
    conn.commit()
    
    sql_insert_query = """
    INSERT INTO engineers_table (name) VALUES (%s)
    """
    engineers_list = engineers_df["name"]
    records = [(name,) for name in engineers_list]
    
    result = cursor.executemany(sql_insert_query, records)
    conn.commit()
    
    if conn:
         cursor.close()
         conn.close()

def push_staging_table_to_psql(staging_df):
    cursor, conn = psql_establish_connection()
    
    sql_drop_query = "DROP TABLE IF EXISTS staging_table"
    cursor.execute(sql_drop_query)
    conn.commit()
    
    sql_create_query = """
    CREATE TABLE staging_table (
        sales_order TEXT NOT NULL PRIMARY KEY,
        engineer TEXT,
        staging_status TEXT NOT NULL,
        date_drawn DATE,
        no_carton INT,
        last_status_update DATE
    )
    """
    
    cursor.execute(sql_create_query)
    conn.commit()
    
    sql_insert_query = """
    INSERT INTO staging_table (
        sales_order, engineer, staging_status, date_drawn, no_carton, last_status_update
    ) VALUES (%s, %s, %s, %s, %s, %s)
    """
    
    records = [tuple(x) for x in staging_df.to_records(index=False)]
    result = cursor.executemany(sql_insert_query, records)
    conn.commit()

# =============================================================================
# Main - Run here
# =============================================================================
# Specify file path here
eDSR_FILEPATH = r"C:\Users\candy.lim\OneDrive - NTT\InnoStage\eDSR.xlsx" # Sample
eTSR_FILEPATH = r"C:\Users\candy.lim\OneDrive - NTT\InnoStage\TSRExport_20240412102507555.xls" # Sample

eTSR_df, combined_df = transform_combined_table(eDSR_FILEPATH, eTSR_FILEPATH)
engineers_df = transform_engineers_table(eTSR_df)
staging_df = transform_staging_table(combined_df)

push_combined_table_to_psql(combined_df)
push_engineers_table_to_psql(engineers_df)
push_staging_table_to_psql(staging_df)