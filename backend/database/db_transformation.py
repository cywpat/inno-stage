import psycopg2
import pandas as pd
import numpy as np
import re
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
    
    # 1. Remove every odd occurance of the names
    eTSR_df['Engineer'] = eTSR_df['Engineer'].apply(lambda x: x if pd.isna(x) else ', '.join(x.split(', ')[1::2]))
    eTSR_df['Project Manager'] = eTSR_df['Project Manager'].apply(lambda x: x if pd.isna(x) else ', '.join(x.split(', ')[1::2]))
    eTSR_df['Business Unit'] = eTSR_df['Business Unit'].apply(lambda x: x.replace("&amp;", "&") if isinstance(x, str) else x)
    
    # 2. Standardise "&"/"," to ","
    eTSR_df['Client PO Number'] = eTSR_df['Client PO Number'].apply(lambda x: x.replace(" &", ",") if isinstance(x, str) else x)
    
    # Inner join 
    combined_df = pd.merge(eDSR_df,eTSR_df, on=['Sales Order'], how='inner')
    
    # Transformation 
    # 1. Filter values 
    combined_df = combined_df[combined_df['Delivery Order Criteria'].isin(["Professional Service Order (only for Internal Staging)", "Bundled Order"])] 
    
    # 2. Turn blanks into nan
    combined_df = combined_df.fillna(np.nan)
    
    # 3. Convert values into date datatyoe
    combined_df['Delivery AC Month'] = combined_df['Delivery AC Month'].dt.date # convert to none version of date
    
    combined_df['Date Creation'] = combined_df['Date Creation'].astype('datetime64[ns]')
    combined_df['Date Closed'] = combined_df['Date Closed'].astype('datetime64[ns]')
    
    combined_df['Date Creation'] = combined_df['Date Creation'].dt.date
    combined_df['Date Closed'] = combined_df['Date Closed'].dt.date
    
    # 4. Sort the columns by alphabetical
    combined_df = combined_df.reindex(sorted(combined_df.columns), axis=1)
    
    # 5. Shift SO column to the front
    combined_df = combined_df[['Sales Order'] + [ col for col in combined_df.columns if col != 'Sales Order' ]]
    
    # 6. Create 3 new columns
    combined_df["Hardware Received"] = None
    combined_df["Staging Status"] = None
    combined_df["Last Status Update"] = None
    
    return eTSR_df, eDSR_df, combined_df

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
    engineers_df['role'] = "engineer"

    return engineers_df

def transform_projectmanagers_table(eTSR_df):
    projectmanagers_df = pd.DataFrame()
    projectmanagers_df['project_manager'] = pd.DataFrame(eTSR_df['Project Manager'])
    
    # 1. Replace NaN with an empty string to avoid issues with split
    projectmanagers_df['project_manager'] = projectmanagers_df['project_manager'].fillna('')
    
    # 2. Split the entries by comma and space, explode the list-like values into separate rows, and strip whitespace
    projectmanagers_df = projectmanagers_df.assign(project_manager=projectmanagers_df['project_manager'].str.split(', ')).explode('project_manager')
    
    # 3. Drop rows where project_manager are empty strings
    projectmanagers_df = projectmanagers_df[projectmanagers_df['project_manager'] != '']
    
    # 4. Sort engineer names alphabetically
    projectmanagers_df = projectmanagers_df.sort_values('project_manager')
    
    # 5. Reset the index and remove duplicate entries
    projectmanagers_df = projectmanagers_df.drop_duplicates().reset_index(drop=True)
    projectmanagers_df.columns=["name"]
    projectmanagers_df['role'] = "project manager"
    
    return projectmanagers_df

def transform_logistics_table(eDSR_df):
    logistics_df = pd.DataFrame()
    logistics_df['logs_pic'] = pd.DataFrame(eDSR_df['Logistics PIC'])
    
    # 1. Replace NaN with an empty string to avoid issues with split
    logistics_df['logs_pic'] = logistics_df['logs_pic'].fillna('')
    
    # 2. Split the entries by comma and space, explode the list-like values into separate rows, and strip whitespace
    logistics_df = logistics_df.assign(logs_pic=logistics_df['logs_pic'].str.split(', ')).explode('logs_pic')
    
    # 3. Drop rows where logs_pic are empty strings
    logistics_df = logistics_df[logistics_df['logs_pic'] != '']
    
    # 4. Sort engineer names alphabetically
    logistics_df = logistics_df.sort_values('logs_pic')
    
    # 5. Reset the index and remove duplicate entries
    logistics_df = logistics_df.drop_duplicates().reset_index(drop=True)
    logistics_df.columns=["name"]
    logistics_df['role'] = "logistics"
    
    return logistics_df

def transform_users_table(eTSR_df, eDSR_df, combined_df):
    engineers_df = transform_engineers_table(eTSR_df)
    projectmanagers_df = transform_projectmanagers_table(eTSR_df)
    logistics_df = transform_logistics_table(eDSR_df)

    # 1. Append all 3 dfs
    users_df = pd.DataFrame()
    users_df = pd.concat([projectmanagers_df, engineers_df, logistics_df], ignore_index=True)
    
    # 2. Generate email addresses based on names
    def generate_email(name):
        # Remove punctuation from the name
        name = re.sub(r'[^\w\s]', '', name.lower())
        # Split the name into parts
        parts = name.split()
        if len(parts) == 1:
            # If there's only one part, use it as is
            email = parts[0]
        else:
            # Otherwise, concatenate the first name, dot, last name
            first_name = ''.join(parts[0:-1])
            last_name = parts[-1]
            email = first_name + '.' + last_name
        email += '@global.ntt'
        return email

    # 3. Add the username and password as new columns to the DataFrame        
    users_df['username'] = users_df['name'].apply(generate_email)
    users_df['password'] = "P@ssw0rd"    # YT: need to hash password on database
    
    users_df = users_df[['username'] + [ col for col in users_df.columns if col != 'username' ]]
    
    return users_df

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
        hardware_received TEXT,
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
        service_unit, tsr_number, hardware_received, staging_status, last_status_update
    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    
    combined_df = combined_df.where(pd.notnull(combined_df), None)
    records = [tuple(x) for x in combined_df.to_records(index=False)]
    
    result = cursor.executemany(sql_insert_query, records)
    conn.commit()

def push_users_table_to_psql(users_df):
    cursor, conn = psql_establish_connection()
    
    sql_drop_query = "DROP TABLE IF EXISTS users_table"
    cursor.execute(sql_drop_query)
    conn.commit()
    
    
    # Create table
    sql_create_query = """
    CREATE TABLE users_table (
        username TEXT NOT NULL PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        password TEXT NOT NULL
    )
    """
    
    cursor.execute(sql_create_query)
    conn.commit()
    
    sql_insert_query = """
    INSERT INTO users_table (username, name, role, password) VALUES (%s, %s, %s, %s)
    """
    
    records = [tuple(x) for x in users_df.to_records(index=False)]
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

eTSR_df, eDSR_df, combined_df = transform_combined_table(eDSR_FILEPATH, eTSR_FILEPATH)
users_df = transform_users_table(eTSR_df, eDSR_df, combined_df)
staging_df = transform_staging_table(combined_df)

push_combined_table_to_psql(combined_df)
push_users_table_to_psql(users_df)
push_staging_table_to_psql(staging_df)