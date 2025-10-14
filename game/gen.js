const fs = require('fs');
const path = require('path');

// Đọc file game.json
const games = JSON.parse(fs.readFileSync('game.json', 'utf-8'));

// Hàm tạo HTML cho từng game
function generateHTML(game) {
  const { title, category, thumbnail, url, introduce, instruct } = game;

  // Lấy phần đường dẫn sau ".store/game/" để làm thư mục
  const urlPath = url.split('.store/game/')[1]; // ví dụ: quyenvuong/webapp
  const outputDir = path.join(__dirname, urlPath);

  // Tạo thư mục nếu chưa có
  fs.mkdirSync(outputDir, { recursive: true });

  const htmlFile = path.join(outputDir, 'index.html');

  const html = `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>HN Game - ${title}</title>

<meta name="description" content="Game ${category} ${title} cực hay">
<meta name="keywords" content="game ${title}, ${category}, game Việt, HN Game, miễn phí, game online, web game">
<meta property="og:title" content="Game ${category} ${title} - HN Game">
<meta property="og:description" content="Chơi game ${title} hoàn toàn miễn phí, vui nhộn và hấp dẫn.">
<meta property="og:image" content="${thumbnail}">
<meta property="og:url" content="${url}">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Game ${category} ${title}">
<meta name="twitter:description" content="Chơi game ${title} hoàn toàn miễn phí, vui nhộn và hấp dẫn.">
<meta name="twitter:image" content="${thumbnail}">

<style>
  body { background:#0f172a; color:#e2e8f0; font-family:'Arial',sans-serif; margin:0; padding:0; }
  header{text-align:center;padding:20px;background:#1e293b;color:#fff;}
  nav{background:#334155;display:flex;justify-content:center;flex-wrap:wrap;gap:15px;padding:10px 0;}
  nav a{color:#f8fafc;text-decoration:none;padding:8px 14px;border-radius:6px;transition:0.3s;}
  nav a:hover{background:#60a5fa;color:#fff;}
  main{max-width:1200px;margin:20px auto;padding:0 15px;}
  .section{background:#1e293b;border-radius:10px;padding:20px;margin-bottom:20px;}
  .section h2{color:#60a5fa;margin-top:0;}
  .game-container{display:flex;flex-direction:column;align-items:center;background:#1e293b;border-radius:12px;padding:20px;}
  canvas#canvas{width:486px;height:864px;border:2px solid #334155;border-radius:10px;background:#000;}
  footer{text-align:center;padding:20px;background:#1e293b;color:#94a3b8;font-size:14px;}
  @media(max-width:1200px){canvas#canvas{width:100%;height:auto;}}
  .fullscreen-button{margin-top:10px;padding:10px 20px;background:#3b82f6;border:none;border-radius:8px;color:white;font-size:16px;cursor:pointer;transition:background 0.2s;}
  .fullscreen-button:hover{background:#2563eb;}
</style>
</head>

<body oncontextmenu="return false" onload="start()">
<header>
  <h1>HN Game</h1>
  <p>Kho game Việt chất lượng - chơi miễn phí, giải trí mỗi ngày</p>
</header>

<nav>
  <a href="../../../index.html">Trang chủ</a>
  <a href="../../../chienthuat.html">Game chiến thuật</a>
  <a href="../../../hanhdong.html">Game hành động</a>
  <a href="../../../tritue.html">Game trí tuệ</a>
  <a href="../../../thethao.html">Game thể thao</a>
  <a href="../../../lienhe.html">Liên hệ</a>
</nav>

<main>
  <section class="section">
    <h2>🎮 Giới thiệu game</h2>
    <p><strong>${title}</strong> ${introduce}</p>
  </section>

  <section class="game-container">
    <canvas id="canvas" width="1080" height="1920"></canvas>
    <div style="height:10px;"></div>
    <button id="fullscreen-btn" class="fullscreen-button">🖥️ Full màn hình.</button>
  </section>

  <div style="height:30px;"></div>

  <section class="section">
    <h2>📜 Hướng dẫn chơi</h2>
    <ul>
      ${instruct.split('.').map(line => line.trim()).filter(line => line).map(line => `<li>${line}.</li>`).join('\n      ')}
    </ul>
  </section>
</main>

<footer>
  &copy; 2025 HN Game. Tất cả bản quyền được bảo lưu.
</footer>

<script>
async function start() { main(); }
</script>

<script>
const canvas = document.getElementById("canvas");
const fullBtn = document.getElementById("fullscreen-btn");

fullBtn.addEventListener("click", () => {
  if(canvas.requestFullscreen) canvas.requestFullscreen();
  else if(canvas.webkitRequestFullscreen) canvas.webkitRequestFullscreen();
  else if(canvas.msRequestFullscreen) canvas.msRequestFullscreen();
});

document.addEventListener("fullscreenchange", () => {
  if(!document.fullscreenElement){canvas.style.width="486px";canvas.style.height="864px";}
});
</script>

<script type="text/javascript" charset="utf-8" src="teavm/app.js"></script>
</body>
</html>`;

  fs.writeFileSync(htmlFile, html, 'utf-8');
  console.log(`Đã tạo file: ${htmlFile}`);
}

// Tạo HTML cho tất cả game
games.forEach(generateHTML);
