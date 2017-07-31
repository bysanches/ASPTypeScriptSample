<%
Function SetSession(ByVal key, ByVal val)
    Session(key) = val
End Function
    
Function ToVBDate(ByVal jsDate)
    ToVBDate = DateAdd("s", jsDate.getTime() / 1000, #1970-1-1#)
End Function
%>