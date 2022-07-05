
$("#add-user-form").submit(function(){
    alert("form submitted");
})

$("#update-user-form").submit(function(event){
    alert("form updated");
    event.preventDefault();
    var unindexedArray = $(this).serializeArray();
    
    var data={}
    $.map(unindexedArray,function(n,i){
       data[n['name']]=n['value'];

    })
    console.log(data);
    var request={
        "url":`http://localhost:8080/api/users/${data.id}`,
        "method":"PUT",
        "data":data

    }
    $.ajax(request).done(function(response){
        alert("data updated sucessfully");
    })
    console.log(unindexedArray);
})

if(window.location.pathname=='/'){
    $ondelete=$(".btn-delete");
    $ondelete.click(function(){
        var id=$(this).attr("data-id")
        var request={
        "url":`http://localhost:8080/api/users/${id}`,
        "method":"DELETE",
        }

     if(confirm("Do yo really want to delete this record")){
        $.ajax(request).done(function(response){
        alert("data deleted sucessfully");
        location.reload();
        })
     }
    })
}