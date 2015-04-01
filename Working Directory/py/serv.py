import pypyodbc

#db = mysql.connector.connect(host = 'djjvelluhi.database.windows.net,1433',
#								user='michael@djjvelluhi',
#								# Don't forget to change the next two lines, as needed.
#								password='Goldman1',
#								database='contactdb' )
								
db = pypyodbc.connect('Driver={SQL Server Native Client 10.0};Server=tcp:djjvelluhi.database.windows.net,1433;Database=contactdb;Uid=michael@djjvelluhi;Pwd=Goldman1;Encrypt=yes;Connection Timeout=30;')

# prepare a cursor object using cursor() method
cursor = db.cursor()
sql = """insert into valid_users(name,password,coins)
         values('Mac', 'passpass',117)"""
cursor.execute(sql)
db.commit()
# disconnect from server
db.close()
