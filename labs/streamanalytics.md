SELECT
    System.TimeStamp AS time,
    AVG(windSpeed) as windSpeed, 
    COUNT(*) AS[eventCount]
INTO
    powerbi
FROM
    iothub
GROUP BY
    time, windSpeed,
    TumblingWindow(second, 10)

SELECT
    System.TimeStamp AS time,
    windSpeed,
    deviceId
INTO
    lake
FROM
    iothub

SELECT
    System.TimeStamp AS time,
    AVG(windSpeed) as windSpeed, 
    COUNT(*) AS[eventCount]
INTO
    myFunction
FROM
    iothub
GROUP BY
    time, windSpeed,
    TumblingWindow(second, 10)
