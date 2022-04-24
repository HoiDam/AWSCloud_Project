import csv
from distutils import errors
import pandas as pd
import glob
import math
from flask import Flask
from flask import request, jsonify

path = r'C:\Users\boris\Desktop\detail-records'
all_files = glob.glob(path + "\*.csv")
start_day = input("Enter the start date of the wanted period of time (xth day of Jan 2017) : ")
new_start_path = path + "\detail_record_2017_01_0" + start_day + "_08_00_00.csv"
end_day = input("Enter the end date of the wanted period of time (xth day of Jan 2017) : ")
new_end_path = path + "\detail_record_2017_01_0" + end_day + "_08_00_00.csv"


new_list = []
for x in range(len(all_files)):
    if (all_files[x] >= new_start_path) and (all_files[x] <= new_end_path):
        new_list.append(all_files[x])

wanted_plate = input("Enter your car plate : ")

for k in range(len(new_list)):
    with open(new_list[k], encoding="utf8") as csvfile:
        df = pd.read_csv(r'C:\Users\boris\Desktop\detail-records\detail_record_2017_01_05_08_00_00.csv', header=None, sep="\t")
        df = df[0].str.split(',', expand=True) 
        df.columns = ['driver ID', 'car plate', 'latitude', 'longtitude', 'speed', 'direction', 'siteName', 'Time', 'isRapidlySpeedup', 'isRapidlySlowdown', 'isNeutralSlide', 'isNeutralSlideFinished', 'neutralSlideTime', 'isOverspeed', 'isOverspeedFinished', 'overspeedTime', 'isFatigueDriving', 'isHthrottleStop', 'isOilLeak', '0']
        dfObj = pd.DataFrame(df, columns = ['driver ID', 'car plate','latitude', 'longtitude', 'speed', 'direction', 'siteName', 'Time', 'isRapidlySpeedup', 'isRapidlySlowdown', 'isNeutralSlide', 'isNeutralSlideFinished', 'neutralSlideTime', 'isOverspeed', 'isOverspeedFinished', 'overspeedTime', 'isFatigueDriving', 'isHthrottleStop', 'isOilLeak'])
        subsetdf = dfObj[dfObj['car plate']== wanted_plate]
        
        driverid = subsetdf['driver ID'].tolist()
                
        neu_start = subsetdf['isNeutralSlide'].value_counts().tolist()
        neu_end = subsetdf['isNeutralSlideFinished'].value_counts().tolist()
        neutral_sliding = math.ceil((neu_start[1]+neu_end[1])/2)
        
        rapid_start = subsetdf['isRapidlySpeedup'].value_counts().tolist()
        rapid_end = subsetdf['isRapidlySlowdown'].value_counts().tolist()
        rapid = math.ceil((rapid_start[1]+rapid_end[1])/2)
        
        over_start = subsetdf['isOverspeed'].value_counts().tolist()
        over_end = subsetdf['isOverspeedFinished'].value_counts().tolist()
        over = math.ceil((over_start[1]+over_end[1])/2)
        
        fatigue = subsetdf['isFatigueDriving'].value_counts().tolist()
        fati = fatigue[1]
        
        leakage = subsetdf['isOilLeak'].value_counts().tolist()
        leak = leakage[1]
        
        throttle = subsetdf['isHthrottleStop'].value_counts().tolist()
        throttle_stop = throttle[1]

        over_time = subsetdf['overspeedTime'].value_counts().tolist()
        overspeed = over_time[1]
        
        neutral_sliding = subsetdf['neutralSlideTime'].value_counts().tolist()
        neutral_time = neutral_sliding[1]

print("Car Plate No. : " + str(wanted_plate))
print("Driver ID: " + str(driverid[1]))
print("Frequency of ...")
print("- Neutral Sliding : " + str(math.ceil((neu_start[1]+neu_end[1])/2)))
print("- Acceleration : " + str(rapid))
print("- OverSpeeding : " + str(over))
print("- Fatigue Driving : " + str(fati))
print("- Oil Leakage : " + str(leak))
print("- Throttle Stop : " + str(throttle_stop))

print("Cumulative time of ...")
print("- Over speeding: " + str(overspeed) + "s")
print("- Neutral slide : " + str(neutral_time) + "s")

@app.route('/throttle', methods=['GET'])
def throttle():
    return str(throttle_stop)

@app.route('/overspeedtime', methods=['GET'])
def overspeedtime():
    return str(overspeed)

@app.route('/oil', methods=['GET'])
def oil_leakage():
    return str(leak)

@app.route('/rapid', methods=['GET'])
def rapid_speeding():
    return str(rapid)

@app.route('/fatigue', methods=['GET'])
def fatigue_driving():
    return str(fati)

@app.route('/neutral', methods=['GET'])
def neutral():
    return str(math.ceil((neu_start[1]+neu_end[1])/2))

@app.route('/overspeed', methods=['GET'])
def overspeed():
    return str(over)

@app.route('/neutral_time', methods=['GET'])
def neutral_time():
    return str(neutral_time)

@app.route('/driver_id', methods=['GET'])
def driver_id():
    return str(driver_id)
