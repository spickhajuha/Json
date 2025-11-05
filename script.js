let allVideos = {};

async function loadVideos() {
  const res = await fetch("videos.json");
  const data = await res.json();
  allVideos = data.videos;
  displayVideos(Object.values(allVideos));
}

function displayVideos(videos) {
  const list = document.getElementById("video-list");
  list.innerHTML = "";
  videos.forEach(video => {
    const card = document.createElement("div");
    card.className = "video-card";
    card.innerHTML = `
      <img src="${video.thumbnail}" alt="${video.title}">
      <div class="video-details">
        <img src="${video.uploaderLogo}" alt="Logo">
        <div>
          <h3>${video.title}</h3>
          <p>${video.uploaderName}</p>
        </div>
      </div>
    `;
    card.onclick = () => openPlayer(video);
    list.appendChild(card);
  });
}

function openPlayer(video) {
  const popup = document.getElementById("player-popup");
  popup.classList.remove("hidden");
  document.getElementById("video-player").src = video.videoUrl;
  document.getElementById("video-title").innerText = video.title;
  document.getElementById("uploader-logo").src = video.uploaderLogo;
  document.getElementById("uploader-name").innerText = video.uploaderName;
}

document.getElementById("close-btn").onclick = () => {
  document.getElementById("player-popup").classList.add("hidden");
  document.getElementById("video-player").pause();
};

// 🔍 Search Function
document.getElementById("search").addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const filtered = Object.values(allVideos).filter(
    v =>
      v.title.toLowerCase().includes(value) ||
      v.uploaderName.toLowerCase().includes(value)
  );
  displayVideos(filtered);
});

loadVideos();