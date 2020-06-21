function selectSeries(seriesName, seriesIndex){
    $.post("/get_episodes", {name: seriesName}, function(data, status) {
        series_data = data[0];
        const oldSeriesIndex = localStorage.getItem("seriesIndex");
        if(oldSeriesIndex){
            $(`.series-select li:nth-child(${oldSeriesIndex})`).toggleClass("active");
        }
        $(".season-select").empty();
        $(".episode-select").empty();
        localStorage.setItem("seriesData", JSON.stringify(series_data));
        localStorage.setItem("seriesName", seriesName);
        localStorage.setItem("seriesIndex", seriesIndex);
        $(`.series-select li:nth-child(${seriesIndex})`).toggleClass("active");
        for(i=0;i<series_data.num_seasons;++i){
            $(".season-select").append(`<li class="list-group-item" onclick="selectSeason(${i+1})">Season ${i+1}</li>`)
        }
    });
}
function selectSeason(seasonNum){
    const seriesData = JSON.parse(localStorage.getItem("seriesData"));
    const links = seriesData.episodes[seasonNum-1];
    const oldSeasonNum = localStorage.getItem("seasonNum");
    if(oldSeasonNum){
        $(`.season-select li:nth-child(${oldSeasonNum})`).toggleClass("active");
    }
    localStorage.setItem("seasonNum", seasonNum);
    $(`.season-select li:nth-child(${seasonNum})`).toggleClass("active");
    $(".episode-select").empty();
    for(i=0;i<links.length;++i){
        $(".episode-select").append(`<li class="list-group-item" onclick="selectEpisode('${links[i]}', ${i+1})">Episode ${i+1}</li>`)
    }
}
function selectEpisode(link, episodeNum){
    const seriesName = localStorage.getItem("seriesName");
    const seasonNum = localStorage.getItem("seasonNum");
    const oldepisodeNum = localStorage.getItem("episodeNum");
    if(oldepisodeNum){
        $(`.episode-select li:nth-child(${oldepisodeNum})`).toggleClass("active");
    }
    localStorage.setItem("episodeNum", episodeNum);
    $(`.episode-select li:nth-child(${episodeNum})`).toggleClass("active");
    $.post("/play_link", {link: link}, function(data, status) {
        if(data === "playing"){
            $(".now-playing").empty();
            $(".now-playing").append(`Now Playing: ${seriesName} S${seasonNum}E${episodeNum}`);
        }
    });
}
$( document ).ready(function() {
    localStorage.clear();
    $(".prev").click(() => {
        const seriesData = JSON.parse(localStorage.getItem("seriesData"));
        const seriesName = localStorage.getItem("seriesName");
        const episode = parseInt(localStorage.getItem("episodeNum"))-2;
        const season = parseInt(localStorage.getItem("seasonNum"))-1;
        $.post("/play_link", {link: seriesData.episodes[season][episode]}, function(data, status) {
            if(data === "playing"){
                localStorage.setItem("episodeNum", episode+1);
                $(".now-playing").empty();
                $(".now-playing").append(`Now Playing: ${seriesName} S${season+1}E${episode+1}`);
            }
        });
    });
    $(".pause").click(() => {
        $.post("/click", {x: 2560/2, y: 500}, function(data, status) {
            console.log(data);
        });
    });
    $(".next").click(() => {
        const seriesData = JSON.parse(localStorage.getItem("seriesData"));
        const seriesName = localStorage.getItem("seriesName");
        const episode = parseInt(localStorage.getItem("episodeNum"));
        const season = parseInt(localStorage.getItem("seasonNum"))-1;
        $.post("/play_link", {link: seriesData.episodes[season][episode]}, function(data, status) {
            if(data === "playing"){
                localStorage.setItem("episodeNum", episode);
                $(".now-playing").empty();
                $(".now-playing").append(`Now Playing: ${seriesName} S${season+1}E${episode+1}`);
            }
        });
    });
    $(".fullscreen").click(() => {
        $.post("/key_press", {key: "f"}, function(data, status) {
            console.log(data);
        });
    });
    $(".close").click(() => {
        $.post("/hotkey",{key1: "ctrl", key2: "w"}, function(data, status) {
            console.log(data);
        });
    });
    $(".new-tab").click(() => {
        $.post("/hotkey",{key1: "ctrl", key2: "t"}, function(data, status) {
            console.log(data);
        });
    });
});