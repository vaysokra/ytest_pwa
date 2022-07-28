window.registerMouseCoordinatesHandler = function (dotNetObjRef) {
    function mouseCoordinatesHandler() {
        dotNetObjRef.invokeMethodAsync("ShowCoordinates");
    };
    mouseCoordinatesHandler();
    //document.getElementById("coordinates").onmousemove = mouseCoordinatesHandler;
}