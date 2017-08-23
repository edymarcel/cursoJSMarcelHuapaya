class Loader{
    static activaLoading(){
        let loading = document.body.querySelector("#loading");
        loading.setAttribute("style", "");
    }

    static desactivaLoading(){
        loading.setAttribute("style", "display:none");
    }
}