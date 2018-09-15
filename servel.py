import requests
import json
import mysql.connector
import chile_rut
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  passwd="789123",
  database="servel"
)
cursor = mydb.cursor()
def insercionDB(nombre,rut,sexo):
    sql = "INSERT INTO persona (name, rut,gender) VALUES (%s, %s,%s)"
    val = (nombre, rut,sexo)
    cursor.execute(sql, val)
    mydb.commit()

def insertServel(rut,pais,region,comuna,provincia,mesa,domicilio,circunscripcion):
    sql = "insert into servel (rut,pais,region,comuna,provincia,mesa,domicilio,circunscripcion) values (%s,%s,%s,%s,%s,%s,%s,%s)"
    val = (rut,pais,region,comuna,provincia,mesa,domicilio,circunscripcion)
    cursor.execute(sql,val)
    mydb.commit()

personas = []
for i in range(4001184,25000000):
    rut = str(i)+"-"+chile_rut.verification_digit(str(i))
    print rut
    if chile_rut.validate_rut(rut):
        url = 'https://api.rutify.cl/rut/'+str(i)
        response = requests.get(url)
        persona = response.json()
        if(len(persona)>2):
            print persona['rut']
            try:
                nombre = persona['nombre']
                rut = persona['rut']
                if(persona['sexo']==1 or persona['sexo'] == '1'):
                    sexo =  "M"
                else :
                    sexo = 'F'
                insercionDB(nombre,rut,sexo)

                servel = persona['servel']
                provincia = servel['provincia']
                comuna = servel['comuna']
                domicilioElectoral = servel['domicilio electoral']
                region = servel['region']
                pais = servel['pais']
                mesa = servel['mesa']
                circunscripcion = servel['circunscripcion']
                insertServel(rut,pais,region,comuna,provincia,mesa,domicilioElectoral,circunscripcion)
                print "bien"
            except Exception as e:
                pass
