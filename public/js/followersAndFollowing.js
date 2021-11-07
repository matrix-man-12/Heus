$(document).ready(()=>{
    if(selectedTab =="followers"){
        loadFollwers();
    }else{
        loadFollowing();
    }

    
});

function loadFollwers(){
    $.get(`/api/users/${profileUserId}/followers`,(results)=>{
        outputUsers(results.followers,$(".resultsContainer"));
    });
}

function loadFollowing(){
    $.get(`/api/users/${profileUserId}/following`,(results)=>{
        outputUsers(results.following,$(".resultsContainer"));
    });
}

