USE [Yad2]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetPointsInPolygon]    Script Date: 03/11/2016 00:41:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[sp_GetPointsInPolygon]
    @polygon geometry

AS

BEGIN 

SELECT * FROM Listings WHERE IsSold = 0 and [Sp_geometry].STIntersects(@polygon) = 1 

END 