from flask import Flask, jsonify, make_response
import pymysql
import time
import random
import datetime

def connectDB():
    db = pymysql.connect(host='database-1.cgv3tdh2av5r.us-east-1.rds.amazonaws.com',
                         user='admin',
                         password='2024hktoca',
                         db='dev')
    return db

def genSpeedTick():
    speed = 10 + 10* random.randint(1,20)
    timestamp = int(time.time())
    # print(timestamp)
    return (speed, timestamp)

app = Flask(__name__)

@app.route("/")
def hello_from_root():
    return jsonify(message='Hello from root!')


@app.route("/hello")
def hello():
    return jsonify(message='Hello from path testing!')

@app.route("/getDriverList",methods=["GET"])
def getDriverList():
    try:    
        db = connectDB()
        cursor = db.cursor()
        sql = "SELECT driverID FROM driver_list"
        cursor.execute(sql)
        result = cursor.fetchall()
        
        parsed = []
        for r in result:
            parsed.append(r[0])
            
        return jsonify(parsed)
    except Exception as e:
        print(e)
        pass

@app.route("/insertSpeedTick/<driverID>",methods=["GET"])
def insertSpeedTick(driverID):
    try:
        db = connectDB()
        cursor = db.cursor()
        sql = "INSERT INTO real_time_monitoring (speed, ctime, driverID) VALUES (%s, %s, %s)"
        speed, timestamp = genSpeedTick()
        cursor.execute(sql, (speed, timestamp,driverID))
        db.commit()
        return jsonify(message="Inserted successfully!")
    except Exception as e:
        print(e)
        pass

@app.route('/getSpeedHistory/<driverID>', methods=['GET'])
def getSpeedHistory(driverID):
    try:
        db = connectDB()
        cursor = db.cursor()
        sql = "SELECT ctime, speed FROM real_time_monitoring WHERE driverID = %s"
        cursor.execute(sql, (driverID))
        result = cursor.fetchall()
        return jsonify(result)
    except Exception as e:
        print(e)
        pass   

@app.route('/getOverspeedThreshold', methods=['GET'])
def getOverspeedThreshold():
    try:
        result = {"overspeedThreshold": "120"}
        return jsonify(result)
    except Exception as e:
        print(e)
        pass

@app.errorhandler(404)
def resource_not_found(e):
    return make_response(jsonify(error='Not found!'), 404)


# app.run(host="0.0.0.0", port=3009)