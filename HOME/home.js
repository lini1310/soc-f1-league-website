new Twitch.Embed("twitch-embed", {
    width: 560,
    height: 315,
    channel: "soc_league",
    layout: "video",
    autoplay: false
  });

  // Check if channel is live and update player
  setInterval(function() {
    fetch("https://api.twitch.tv/helix/streams?user_login=soc_league", {
      headers: {
        "Client-ID": "cmkzi047mkhrwv17bj2t4r8kymz9x5"
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.data.length > 0) {
        document.getElementById("twitch-embed").innerHTML = "";
        new Twitch.Embed("twitch-embed", {
          width: 854,
          height: 480,
          channel: "soc_league",
          layout: "video",
          autoplay: true
        });
      }
    });
  }, 60000);


    async function isLive(soc_league) {
      const response = await fetch(`https://api.twitch.tv/helix/streams?user_login=soc_league`, {
        headers: {
          "Client-ID": "cmkzi047mkhrwv17bj2t4r8kymz9x5"
        }
      });
    
      if (response.ok) {
        const data = await response.json();
        return data.data.length > 0;
      }
    
      return false;
    }
    
    isLive("soc_league").then(live => {
      if (live) {
        getElementById("overtext").innerHTML = "JETZT LIVE!";
      } else {
        getElementById("overtext").innerHTML = "🔴 - Offline, in unserem Kalender sind die nächsten Rennen eingetragen!";
      }
    });
    