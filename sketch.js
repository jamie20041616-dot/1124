// ==========================================
// 資源設定：角色與背景資源路徑
// ==========================================
const CHARACTER_PATH = '2/'; // 角色資料夾路徑

// 背景圖清單（可依實際檔名增減）
const BG_CONFIG = [
  { name: '中世紀王城村莊', path: 'bg/0.png', fallbackTheme: 'medieval' },
  { name: '奇幻遺跡森林', path: 'bg/bg_forest.png', fallbackTheme: 'forest' },
  { name: '霓虹賽博城邦', path: 'bg/bg_cyber.png', fallbackTheme: 'cyber' }
];

// 動畫幀數設定（可依新角色的實際張數調整）
const FRAME_COUNTS = {
  stop: 6,
  walk: 8,
  jump: 6,
  magic: 4,
  effect: 4
};

// 顯示尺寸設定（設為 null 則使用原圖像素尺寸）
const DISPLAY_CONFIG = {
  characterHeight: 160,
  effectHeight: 72,
  groundOffset: 140 // 地面距離視窗底部的像素高度
};

// ==========================================
// 小學英文教學題庫（老師可自由修改或新增題目）
// ==========================================
const QUIZ_BANK = {
  elder: {
    topic: '日常問候與基礎單字',
    intro: '歡迎來到王城！答對我的「基礎英文問候」考驗，就能獲得經驗值與魔力金幣喔！',
    completeMsg: '太優秀了！你已經通過大法師的基礎英文試煉，繼續去挑戰其他導師吧！',
    questions: [
      {
        question: '早上見到老師時，應該說哪一句英文？',
        speechText: 'Good morning',
        options: ['Good morning', 'Good night', 'Goodbye'],
        answerIndex: 0,
        explanation: 'Good morning 是「早安」，Good night 是「晚安」喔！'
      },
      {
        question: '「謝謝你」的英文怎麼說？',
        speechText: 'Thank you',
        options: ['Excuse me', 'Thank you', 'I am sorry'],
        answerIndex: 1,
        explanation: 'Thank you 就是「謝謝你」，非常有禮貌！'
      },
      {
        question: '「How are you?」是什麼意思？',
        speechText: 'How are you?',
        options: ['你叫什麼名字？', '你幾歲了？', '你好嗎？'],
        answerIndex: 2,
        explanation: 'How are you? 是問候對方「你好嗎？」，可以回答 I am fine!'
      },
      {
        question: '「書本」的英文單字是哪一個？',
        speechText: 'book',
        options: ['Book', 'Desk', 'Chair'],
        answerIndex: 0,
        explanation: 'Book 是「書本」，Desk 是書桌，Chair 是椅子。'
      }
    ]
  },
  merchant: {
    topic: '食物、顏色與動物單字',
    intro: '嗨！冒險者！幫我認出商店裡的英文單字，我就送你金幣與經驗值！',
    completeMsg: '哇～你全部答對了！你真是個英文小天才，歡迎隨時再來練習！',
    questions: [
      {
        question: '「蘋果」的英文是哪一個？',
        speechText: 'apple',
        options: ['Banana', 'Apple', 'Orange'],
        answerIndex: 1,
        explanation: 'Apple 是「蘋果」，A-P-P-L-E！'
      },
      {
        question: '天空和魔法藥水常出現的「藍色」英文是？',
        speechText: 'blue',
        options: ['Red', 'Yellow', 'Blue'],
        answerIndex: 2,
        explanation: 'Blue 是「藍色」，Red 是紅色，Yellow 是黃色。'
      },
      {
        question: '哪一個英文單字是指「大象」？',
        speechText: 'elephant',
        options: ['Elephant', 'Rabbit', 'Tiger'],
        answerIndex: 0,
        explanation: 'Elephant 是「大象」，Rabbit 是兔子，Tiger 是老虎。'
      },
      {
        question: '「牛奶」的英文單字是哪一個？',
        speechText: 'milk',
        options: ['Water', 'Milk', 'Juice'],
        answerIndex: 1,
        explanation: 'Milk 是「牛奶」，喝牛奶可以長高長壯喔！'
      }
    ]
  },
  knight: {
    topic: '數字、動作與基礎句型',
    intro: '皇家騎士不只要會魔法，還要懂動作與句型英文！準備好接受騎士考驗了嗎？',
    completeMsg: '幹得好，勇敢的小騎士！你的英文實力已經達到王國守衛等級了！',
    questions: [
      {
        question: '「跳躍」的英文動詞是哪一個？',
        speechText: 'jump',
        options: ['Sleep', 'Eat', 'Jump'],
        answerIndex: 2,
        explanation: 'Jump 就是「跳躍」，跟你在遊戲裡按空白鍵一樣！'
      },
      {
        question: '數字「7」的英文是哪一個？',
        speechText: 'seven',
        options: ['Seven', 'Six', 'Eight'],
        answerIndex: 0,
        explanation: 'Six 是 6、Seven 是 7、Eight 是 8！'
      },
      {
        question: '填空：I can ____.（我會跑步。）',
        speechText: 'I can run.',
        options: ['blue', 'run', 'apple'],
        answerIndex: 1,
        explanation: 'I can run. 意思是「我會跑步」，run 是動詞「跑」。'
      },
      {
        question: '填空：Open the ____.（請打開門。）',
        speechText: 'Open the door.',
        options: ['dog', 'sun', 'door'],
        answerIndex: 2,
        explanation: 'Open the door. 是教室很常用的句子「請打開門」。'
      }
    ]
  }
};

// 資源存放容器
let animations = {
  stop: [],
  walk: [],
  jump: [],
  magic: [],
  effect: []
};

let bgImages = [];
let currentBgIndex = 0;

// 遊戲實體與 RPG 教學狀態
let player;
let activeEffects = [];
let npcs = [];
let trainingDummy;
let floatingTexts = [];
let hitParticles = [];
let showUI = true;

// 學習進度與 RPG 成長系統
const learningStats = {
  level: 1,
  exp: 0,
  expToNext: 200,
  coins: 0,
  correctCount: 0,
  totalAnswered: 0,
  streak: 0,
  bestStreak: 0,
  allClearedNotified: false
};

// 當前問答互動狀態
// phase: 'intro' | 'question' | 'feedback' | 'complete'
let activeQuiz = null;
let quizUiHitboxes = {
  options: [],
  primaryBtn: null,
  speakBtn: null,
  closeBtn: null
};

// ==========================================
// 瀏覽器內建英文語音朗讀（Web Speech API）
// ==========================================
function speakEnglish(text) {
  if (!text || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.rate = 0.88; // 稍微放慢語速，適合小學生聆聽
    utter.pitch = 1.05;
    window.speechSynthesis.speak(utter);
  } catch (e) {
    // 忽略不支援語音的環境錯誤
  }
}

// ==========================================
// 非同步安全載入資源（缺圖時不會卡住或報錯）
// ==========================================
function loadAllAssets() {
  bgImages = new Array(BG_CONFIG.length).fill(null);
  BG_CONFIG.forEach((cfg, idx) => {
    loadImage(
      cfg.path,
      (img) => {
        bgImages[idx] = img;
      },
      () => {
        bgImages[idx] = null;
      }
    );
  });

  loadFrames('stop', FRAME_COUNTS.stop);
  loadFrames('walk', FRAME_COUNTS.walk);
  loadFrames('jump', FRAME_COUNTS.jump);
  loadFrames('magic', FRAME_COUNTS.magic);
  loadFrames('magic_effect', FRAME_COUNTS.effect, 'effect');
}

function loadFrames(folder, count, targetKey = folder) {
  animations[targetKey] = new Array(count).fill(null);
  for (let i = 0; i < count; i++) {
    const path = `${CHARACTER_PATH}${folder}/${i}.png`;
    loadImage(
      path,
      (img) => {
        animations[targetKey][i] = img;
      },
      () => {
        animations[targetKey][i] = null;
      }
    );
  }
}

function getValidFrame(key, index) {
  const list = animations[key];
  if (!list || list.length === 0) return null;
  const safeIdx = constrain(Math.floor(index), 0, list.length - 1);
  if (list[safeIdx]) return list[safeIdx];
  return list.find((img) => img !== null) || null;
}

// ==========================================
// 核心設定與主循環 (setup & draw)
// ==========================================
function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  frameRate(60);

  loadAllAssets();

  const groundY = getGroundY();
  player = new Character(width * 0.45, groundY);
  initRPGWorld();
}

function getGroundY() {
  return height - DISPLAY_CONFIG.groundOffset;
}

function initRPGWorld() {
  const groundY = getGroundY();

  npcs = [
    new NPC({
      id: 'elder',
      name: '梅林長老',
      title: '問候單字導師',
      role: 'mage',
      xRatio: 0.18,
      y: groundY,
      patrolRange: 0,
      quizKey: 'elder'
    }),
    new NPC({
      id: 'merchant',
      name: '蘿拉',
      title: '生活單字導師',
      role: 'merchant',
      xRatio: 0.33,
      y: groundY,
      patrolRange: 26,
      quizKey: 'merchant'
    }),
    new NPC({
      id: 'knight',
      name: '雷歐爵士',
      title: '動作句型導師',
      role: 'knight',
      xRatio: 0.67,
      y: groundY,
      patrolRange: 50,
      quizKey: 'knight'
    })
  ];

  trainingDummy = new TrainingDummy(0.85, groundY);
}

function draw() {
  // 1. 繪製背景與中世紀 RPG 場景元素
  drawBackground();

  // 2. 更新並繪製 NPC 與練功稻草人
  for (const npc of npcs) {
    npc.update(player);
    npc.display(player);
  }
  if (trainingDummy) {
    trainingDummy.update();
    trainingDummy.display();
  }

  // 3. 更新與繪製主角
  if (player) {
    player.handleInput();
    player.update();
    player.displayShadow();
    player.display();
  }

  // 4. 更新並繪製魔法飛行道具（含命中稻草人判定）
  for (let i = activeEffects.length - 1; i >= 0; i--) {
    const eff = activeEffects[i];
    eff.update();
    eff.display();

    if (trainingDummy && trainingDummy.checkHit(eff)) {
      activeEffects.splice(i, 1);
      continue;
    }

    if (eff.isExpired()) {
      activeEffects.splice(i, 1);
    }
  }

  // 5. 更新並繪製特效粒子與漂浮獎勵文字
  updateAndDrawParticles();
  updateAndDrawFloatingTexts();

  // 6. 繪製操作面板、學習進度 HUD 與英文問答介面
  if (showUI) {
    drawUI();
  }
  drawLearningHud();

  if (activeQuiz) {
    drawQuizModal();
  }
}

// ==========================================
// 英文問答系統核心邏輯
// ==========================================
function startNpcQuiz(npc) {
  const pack = QUIZ_BANK[npc.quizKey];
  if (!pack || !pack.questions.length) return;

  activeQuiz = {
    npc,
    pack,
    phase: 'intro', // 'intro' | 'question' | 'feedback' | 'complete'
    questionIndex: 0,
    selectedIndex: -1,
    isCorrect: false,
    sessionCorrect: 0
  };
}

function beginCurrentQuestion() {
  if (!activeQuiz) return;
  activeQuiz.phase = 'question';
  activeQuiz.selectedIndex = -1;
  activeQuiz.isCorrect = false;

  const q = activeQuiz.pack.questions[activeQuiz.questionIndex];
  if (q && q.speechText) {
    speakEnglish(q.speechText);
  }
}

function submitQuizAnswer(optionIdx) {
  if (!activeQuiz || activeQuiz.phase !== 'question') return;

  const q = activeQuiz.pack.questions[activeQuiz.questionIndex];
  if (!q || optionIdx < 0 || optionIdx >= q.options.length) return;

  activeQuiz.selectedIndex = optionIdx;
  activeQuiz.isCorrect = optionIdx === q.answerIndex;
  activeQuiz.phase = 'feedback';

  learningStats.totalAnswered++;

  if (activeQuiz.isCorrect) {
    activeQuiz.sessionCorrect++;
    learningStats.correctCount++;
    learningStats.streak++;
    learningStats.bestStreak = max(learningStats.bestStreak, learningStats.streak);

    const expGain = 80 + min(learningStats.streak * 10, 50);
    const coinGain = 25;
    awardLearningReward(expGain, coinGain, activeQuiz.npc);

    if (q.speechText) {
      speakEnglish(q.speechText);
    }
  } else {
    learningStats.streak = 0;
    spawnFloatingText(player.x, player.y - 145, '再加油！看看提示喔', color(255, 165, 110), 18);
  }
}

function awardLearningReward(expGain, coinGain, npc) {
  learningStats.exp += expGain;
  learningStats.coins += coinGain;

  spawnFloatingText(player.x, player.y - 148, `+${expGain} EXP  +${coinGain} G`, color(255, 224, 96), 19);
  spawnBurstParticles(player.x, player.y - 80, color(255, 224, 96), 18);
  if (npc) {
    spawnBurstParticles(npc.x, npc.y - 85, color(120, 240, 255), 14);
  }

  // 升級判定
  while (learningStats.exp >= learningStats.expToNext) {
    learningStats.exp -= learningStats.expToNext;
    learningStats.level++;
    learningStats.expToNext = Math.round(learningStats.expToNext * 1.35);
    spawnFloatingText(player.x, player.y - 185, `★ LEVEL UP! Lv.${learningStats.level} ★`, color(120, 255, 175), 24);
    spawnBurstParticles(player.x, player.y - 100, color(120, 255, 175), 28);
  }
}

function advanceQuizFlow() {
  if (!activeQuiz) return;

  if (activeQuiz.phase === 'intro') {
    beginCurrentQuestion();
    return;
  }

  if (activeQuiz.phase === 'feedback') {
    activeQuiz.questionIndex++;
    if (activeQuiz.questionIndex >= activeQuiz.pack.questions.length) {
      activeQuiz.phase = 'complete';
      // 只要完成整組題目且答對過半（或全對）即標記導師任務完成
      if (activeQuiz.sessionCorrect >= Math.ceil(activeQuiz.pack.questions.length * 0.5)) {
        const wasCleared = activeQuiz.npc.questCompleted;
        activeQuiz.npc.questCompleted = true;
        if (!wasCleared) {
          awardLearningReward(120, 50, activeQuiz.npc);
        }
        checkAllQuestsCleared();
      }
    } else {
      beginCurrentQuestion();
    }
    return;
  }

  if (activeQuiz.phase === 'complete') {
    closeQuiz();
  }
}

function checkAllQuestsCleared() {
  if (learningStats.allClearedNotified) return;
  const allCleared = npcs.length > 0 && npcs.every((n) => n.questCompleted);
  if (allCleared) {
    learningStats.allClearedNotified = true;
    spawnFloatingText(width / 2, height * 0.3, '🏆 恭喜獲得「王國英文勇者」稱號！ 🏆', color(255, 224, 92), 26);
    spawnBurstParticles(width / 2, height * 0.35, color(255, 215, 80), 36);
  }
}

function closeQuiz() {
  activeQuiz = null;
  quizUiHitboxes = { options: [], primaryBtn: null, speakBtn: null, closeBtn: null };
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

function spawnFloatingText(x, y, txt, col, sz = 18) {
  floatingTexts.push({
    x,
    y,
    vy: -1.4,
    text: txt,
    color: col,
    size: sz,
    life: 62,
    maxLife: 62
  });
}

function spawnBurstParticles(x, y, col, count = 14) {
  for (let i = 0; i < count; i++) {
    const ang = random(TWO_PI);
    const spd = random(2, 6.5);
    hitParticles.push({
      x,
      y,
      vx: cos(ang) * spd,
      vy: sin(ang) * spd - 1.5,
      size: random(4, 9),
      life: random(20, 36),
      maxLife: 36,
      col
    });
  }
}

// ==========================================
// 背景與中世紀 RPG 場景繪製
// ==========================================
function drawBackground() {
  const img = bgImages[currentBgIndex];
  if (img && img.width > 0 && img.height > 0) {
    drawImageCover(img);
    return;
  }

  const theme = BG_CONFIG[currentBgIndex]?.fallbackTheme || 'medieval';
  if (theme === 'forest') {
    drawFantasyForestScene();
  } else if (theme === 'cyber') {
    drawCyberMedievalScene();
  } else {
    drawMedievalVillageScene();
  }
}

function drawImageCover(img) {
  const canvasRatio = width / height;
  const imgRatio = img.width / img.height;
  let drawW = width;
  let drawH = height;

  if (canvasRatio > imgRatio) {
    drawH = width / imgRatio;
  } else {
    drawW = height * imgRatio;
  }

  image(img, width / 2, height / 2, drawW, drawH);
}

function drawGradient(cTop, cBottom, yStart, yEnd) {
  noStroke();
  const steps = 28;
  const stepH = (yEnd - yStart) / steps;
  for (let i = 0; i < steps; i++) {
    fill(lerpColor(cTop, cBottom, i / (steps - 1)));
    rect(0, yStart + i * stepH, width, stepH + 1);
  }
}

// 場景 1：中世紀王城村莊
function drawMedievalVillageScene() {
  const groundY = getGroundY();

  drawGradient(color(68, 122, 198), color(242, 206, 158), 0, groundY);

  noStroke();
  fill(255, 240, 190, 65);
  circle(width * 0.82, height * 0.19, 145);
  fill(255, 246, 208);
  circle(width * 0.82, height * 0.19, 76);

  drawCloud(((frameCount * 0.22) % (width + 240)) - 120, height * 0.16, 1.0);
  drawCloud(((frameCount * 0.15 + width * 0.55) % (width + 260)) - 130, height * 0.25, 0.78);

  fill(116, 134, 168);
  beginShape();
  vertex(0, groundY);
  vertex(width * 0.12, groundY - 165);
  vertex(width * 0.28, groundY - 88);
  vertex(width * 0.46, groundY - 195);
  vertex(width * 0.68, groundY - 110);
  vertex(width * 0.86, groundY - 170);
  vertex(width, groundY - 105);
  vertex(width, groundY);
  endShape(CLOSE);

  drawMedievalCastle(width * 0.54, groundY - 12);

  fill(88, 142, 82);
  beginShape();
  vertex(0, groundY);
  for (let x = 0; x <= width + 40; x += 60) {
    vertex(x, groundY - 22 - sin(x * 0.008) * 18);
  }
  vertex(width, groundY);
  endShape(CLOSE);

  drawMedievalTavern(width * 0.14, groundY);
  drawQuestNoticeBoard(width * 0.42, groundY);
  drawTorchBrazier(width * 0.26, groundY);
  drawTorchBrazier(width * 0.75, groundY);

  drawCobblestoneGround(groundY, color(96, 92, 88), color(72, 132, 68));
}

function drawCloud(x, y, s) {
  push();
  translate(x, y);
  scale(s);
  noStroke();
  fill(255, 248, 236, 170);
  ellipse(0, 0, 90, 34);
  ellipse(-28, 6, 56, 26);
  ellipse(28, 5, 62, 28);
  pop();
}

function drawMedievalCastle(cx, baseY) {
  push();
  translate(cx, baseY);
  noStroke();

  fill(132, 128, 138);
  rect(-155, -135, 310, 135);
  for (let x = -155; x <= 135; x += 26) {
    rect(x, -150, 15, 16);
  }

  const towers = [
    { x: -140, w: 54, h: 195, roofH: 64 },
    { x: 140, w: 54, h: 195, roofH: 64 },
    { x: 0, w: 72, h: 245, roofH: 78 }
  ];

  for (const t of towers) {
    fill(148, 144, 154);
    rect(t.x - t.w / 2, -t.h, t.w, t.h);
    fill(118, 46, 58);
    triangle(t.x - t.w * 0.62, -t.h, t.x + t.w * 0.62, -t.h, t.x, -t.h - t.roofH);

    const wave = sin(frameCount * 0.08 + t.x) * 4;
    stroke(90, 72, 60);
    strokeWeight(2);
    line(t.x, -t.h - t.roofH, t.x, -t.h - t.roofH - 26);
    noStroke();
    fill(218, 56, 62);
    triangle(t.x, -t.h - t.roofH - 25, t.x + 26, -t.h - t.roofH - 19 + wave, t.x, -t.h - t.roofH - 12);

    fill(42, 38, 52);
    rect(t.x - 6, -t.h + 36, 12, 22, 6, 6, 0, 0);
    fill(255, 206, 112, 180);
    rect(t.x - 4, -t.h + 39, 8, 17, 4, 4, 0, 0);
  }

  fill(66, 48, 38);
  rect(-26, -68, 52, 68, 26, 26, 0, 0);
  stroke(46, 32, 24);
  strokeWeight(2);
  line(0, -68, 0, 0);
  line(-26, -34, 26, -34);
  noStroke();
  pop();
}

function drawMedievalTavern(cx, baseY) {
  push();
  translate(cx, baseY);
  noStroke();

  fill(112, 98, 92);
  rect(42, -210, 22, 60);
  for (let i = 0; i < 4; i++) {
    const p = (frameCount * 0.012 + i * 0.25) % 1;
    fill(245, 242, 238, (1 - p) * 120);
    circle(53 + sin(p * 6 + i) * 10, -215 - p * 65, 14 + p * 22);
  }

  fill(228, 212, 184);
  rect(-84, -124, 168, 124);

  fill(96, 64, 42);
  rect(-84, -124, 168, 10);
  rect(-84, -64, 168, 8);
  rect(-84, -124, 10, 124);
  rect(74, -124, 10, 124);
  rect(-4, -124, 8, 124);

  fill(138, 56, 46);
  triangle(-102, -122, 102, -122, 0, -205);
  fill(106, 40, 34);
  rect(-100, -126, 200, 8, 3);

  fill(92, 58, 36);
  rect(-54, -56, 36, 56, 16, 16, 0, 0);
  fill(228, 192, 92);
  circle(-26, -26, 5);

  fill(255, 208, 108);
  rect(20, -98, 36, 30, 4);
  stroke(88, 56, 36);
  strokeWeight(3);
  noFill();
  rect(20, -98, 36, 30, 4);
  line(38, -98, 38, -68);
  line(20, -83, 56, -83);

  stroke(68, 48, 34);
  strokeWeight(3);
  line(84, -95, 118, -95);
  noStroke();
  fill(124, 82, 48);
  rect(90, -92, 32, 24, 4);
  fill(248, 212, 118);
  circle(106, -80, 10);
  pop();
}

function drawQuestNoticeBoard(cx, baseY) {
  push();
  translate(cx, baseY);
  noStroke();

  fill(96, 62, 38);
  rect(-34, -84, 8, 84);
  rect(26, -84, 8, 84);
  fill(134, 90, 54);
  rect(-42, -92, 84, 52, 4);
  fill(88, 54, 32);
  rect(-48, -98, 96, 10, 3);

  fill(246, 234, 204);
  rect(-32, -82, 22, 28, 2);
  rect(-4, -84, 24, 32, 2);
  rect(22, -78, 14, 20, 2);
  fill(175, 48, 48);
  circle(-21, -79, 4);
  circle(8, -81, 4);
  pop();
}

function drawTorchBrazier(cx, baseY) {
  push();
  translate(cx, baseY);
  noStroke();

  fill(96, 98, 106);
  rect(-14, -18, 28, 18, 3);
  fill(56, 58, 66);
  rect(-5, -56, 10, 38);
  quad(-18, -68, 18, -68, 11, -54, -11, -54);

  const flicker = sin(frameCount * 0.28 + cx) * 3;
  fill(255, 150, 40, 55);
  circle(0, -80, 54 + flicker * 2);
  fill(255, 128, 32, 215);
  triangle(-12, -68, 12, -68, flicker * 0.6, -98 - flicker);
  fill(255, 226, 98);
  triangle(-6, -68, 6, -68, -flicker * 0.4, -86);
  pop();
}

function drawCobblestoneGround(groundY, stoneColor, grassColor) {
  noStroke();
  fill(stoneColor);
  rect(0, groundY, width, height - groundY);

  fill(grassColor);
  rect(0, groundY, width, 12);

  fill(122, 118, 114, 150);
  for (let row = 0; row < 4; row++) {
    const y = groundY + 20 + row * 28;
    const offset = (row % 2) * 34;
    for (let x = -40; x < width + 40; x += 68) {
      rect(x + offset, y, 56, 18, 5);
    }
  }
}

// 場景 2：奇幻遺跡森林
function drawFantasyForestScene() {
  const groundY = getGroundY();
  drawGradient(color(12, 34, 46), color(34, 88, 76), 0, groundY);

  noStroke();
  fill(210, 245, 255, 50);
  circle(width * 0.22, height * 0.2, 130);
  fill(230, 252, 255, 220);
  circle(width * 0.22, height * 0.2, 68);

  for (let layer = 0; layer < 2; layer++) {
    const step = layer === 0 ? 115 : 155;
    fill(layer === 0 ? color(18, 56, 52) : color(12, 40, 38));
    for (let x = -30; x < width + 80; x += step) {
      const treeH = (layer === 0 ? 220 : 175) + ((x * 13) % 90);
      rect(x + 28, groundY - treeH * 0.55, 22, treeH * 0.55);
      triangle(x - 16, groundY - treeH * 0.35, x + 39, groundY - treeH, x + 94, groundY - treeH * 0.35);
      triangle(x - 8, groundY - treeH * 0.6, x + 39, groundY - treeH * 1.15, x + 86, groundY - treeH * 0.6);
    }
  }

  const runeX = width * 0.52;
  const pulse = 150 + sin(frameCount * 0.06) * 85;
  fill(78, 92, 96);
  quad(runeX - 34, groundY, runeX + 34, groundY, runeX + 22, groundY - 155, runeX - 22, groundY - 155);
  triangle(runeX - 22, groundY - 155, runeX + 22, groundY - 155, runeX, groundY - 188);
  fill(80, 240, 220, pulse * 0.35);
  ellipse(runeX, groundY - 95, 95, 140);
  stroke(120, 255, 235, pulse);
  strokeWeight(3);
  noFill();
  circle(runeX, groundY - 115, 22);
  line(runeX, groundY - 104, runeX, groundY - 46);
  line(runeX - 12, groundY - 82, runeX + 12, groundY - 82);
  noStroke();

  for (let i = 0; i < 20; i++) {
    const fx = ((i * 137 + frameCount * 0.4) % (width + 60)) - 30;
    const fy = groundY - 35 - ((i * 73) % max(120, groundY - 120)) + sin(frameCount * 0.04 + i) * 14;
    const alpha = 120 + sin(frameCount * 0.08 + i * 2) * 90;
    fill(168, 255, 195, alpha);
    circle(fx, fy, 6);
  }

  drawCobblestoneGround(groundY, color(34, 62, 52), color(62, 134, 88));
}

// 場景 3：霓虹賽博城邦
function drawCyberMedievalScene() {
  const groundY = getGroundY();
  drawGradient(color(15, 12, 41), color(52, 22, 92), 0, groundY);

  noStroke();
  fill(255, 45, 149, 45);
  circle(width * 0.75, height * 0.24, 190);
  fill(255, 70, 160, 220);
  circle(width * 0.75, height * 0.24, 105);

  const buildingCount = Math.ceil(width / 78) + 1;
  for (let i = 0; i < buildingCount; i++) {
    const bx = i * 78 - 10;
    const bh = 120 + ((i * 67) % 190);
    fill(20, 18, 46);
    rect(bx, groundY - bh, 64, bh);

    fill(i % 2 === 0 ? color(0, 245, 255, 150) : color(255, 65, 180, 150));
    for (let wy = groundY - bh + 16; wy < groundY - 18; wy += 22) {
      for (let wx = bx + 10; wx < bx + 50; wx += 18) {
        if ((i + Math.floor(wy)) % 3 !== 0) {
          rect(wx, wy, 9, 11, 2);
        }
      }
    }
  }

  fill(18, 12, 38);
  rect(0, groundY, width, height - groundY);
  stroke(0, 240, 255, 150);
  strokeWeight(2);
  line(0, groundY, width, groundY);
  strokeWeight(1);
  stroke(255, 50, 180, 80);
  for (let y = groundY + 18; y < height; y += 22) {
    line(0, y, width, y);
  }
  noStroke();
}

// ==========================================
// 左上角操作面板 & 右上角英文冒險進度 HUD
// ==========================================
function drawUI() {
  const currentBg = BG_CONFIG[currentBgIndex];

  push();
  noStroke();
  fill(16, 14, 24, 178);
  rect(14, 14, 304, 168, 10);
  stroke(214, 176, 98, 180);
  strokeWeight(1.5);
  noFill();
  rect(18, 18, 296, 160, 8);

  noStroke();
  fill(255, 224, 138);
  textSize(15);
  textAlign(LEFT, TOP);
  text('【英文冒險操作指南】', 28, 26);

  textSize(13);
  fill(238);
  text('A / D 或 ← →：移動　｜　W / 空白：跳躍', 28, 50);
  text('J / K 鍵：施法攻擊（可打練功靶）', 28, 70);
  text('E 鍵或點擊 NPC：開啟小學英文問答', 28, 90);
  text('B 或 1 / 2 / 3：切換場景　｜　H：隱藏面板', 28, 110);

  fill(140, 228, 255);
  text(`目前場景：${currentBg.name}`, 28, 140);
  pop();
}

function drawLearningHud() {
  const clearedCount = npcs.filter((n) => n.questCompleted).length;
  const panelW = 266;
  const panelH = 114;
  const x = width - panelW - 14;
  const y = 14;

  push();
  noStroke();
  fill(16, 14, 26, 188);
  rect(x, y, panelW, panelH, 10);
  stroke(224, 184, 96, 190);
  strokeWeight(1.5);
  noFill();
  rect(x + 4, y + 4, panelW - 8, panelH - 8, 8);

  noStroke();
  textAlign(LEFT, TOP);
  fill(255, 226, 128);
  textSize(15);
  const rankTitle = learningStats.level >= 3 ? '英文魔導士' : learningStats.level === 2 ? '英文見習生' : '英文冒險者';
  text(`Lv.${learningStats.level} ${rankTitle}`, x + 16, y + 14);

  // 金幣
  textAlign(RIGHT, TOP);
  fill(255, 214, 72);
  textSize(14);
  text(`💰 ${learningStats.coins} G`, x + panelW - 16, y + 15);

  // EXP 經驗條
  const barX = x + 16;
  const barY = y + 40;
  const barW = panelW - 32;
  const barH = 14;
  const expRatio = constrain(learningStats.exp / learningStats.expToNext, 0, 1);

  fill(46, 44, 64);
  rect(barX, barY, barW, barH, 7);
  fill(92, 224, 168);
  rect(barX, barY, barW * expRatio, barH, 7);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(10);
  text(`EXP ${learningStats.exp} / ${learningStats.expToNext}`, barX + barW / 2, barY + barH / 2 + 0.5);

  // 學習統計
  textAlign(LEFT, TOP);
  textSize(12);
  fill(228, 236, 248);
  text(`導師任務：${clearedCount} / ${npcs.length} 完成`, x + 16, y + 64);
  text(`答對題數：${learningStats.correctCount} 題　｜　連勝：${learningStats.streak} 🔥`, x + 16, y + 86);
  pop();
}

// ==========================================
// 小學英文 RPG 問答互動視窗 (Quiz Modal)
// ==========================================
function drawQuizModal() {
  const { npc, pack, phase, questionIndex, selectedIndex, isCorrect, sessionCorrect } = activeQuiz;
  const q = pack.questions[questionIndex];

  const modalW = min(width - 40, 680);
  const modalH = phase === 'question' || phase === 'feedback' ? 360 : 240;
  const mx = (width - modalW) / 2;
  const my = max(24, (height - modalH) / 2 - 12);

  quizUiHitboxes = { options: [], primaryBtn: null, speakBtn: null, closeBtn: null };

  push();
  // 背景柔和遮罩
  noStroke();
  fill(8, 10, 18, 145);
  rect(0, 0, width, height);

  // 中世紀羊皮與深藍金邊面板
  fill(24, 22, 36, 245);
  rect(mx, my, modalW, modalH, 16);
  stroke(232, 192, 102);
  strokeWeight(2.5);
  noFill();
  rect(mx + 6, my + 6, modalW - 12, modalH - 12, 12);

  // 頂部導師名牌
  noStroke();
  fill(152, 46, 54);
  rect(mx + 22, my - 18, 260, 36, 8);
  stroke(242, 204, 118);
  strokeWeight(1.5);
  noFill();
  rect(mx + 22, my - 18, 260, 36, 8);

  noStroke();
  fill(255, 242, 200);
  textAlign(LEFT, CENTER);
  textSize(15);
  text(`${npc.name}・${pack.topic}`, mx + 36, my);

  // 右上角關閉鈕 [Esc]
  const closeBtn = { x: mx + modalW - 46, y: my + 16, w: 28, h: 28 };
  quizUiHitboxes.closeBtn = closeBtn;
  const hoverClose = isPointInRect(mouseX, mouseY, closeBtn);
  fill(hoverClose ? color(196, 62, 62) : color(62, 56, 82));
  rect(closeBtn.x, closeBtn.y, closeBtn.w, closeBtn.h, 6);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(14);
  text('✕', closeBtn.x + closeBtn.w / 2, closeBtn.y + closeBtn.h / 2);

  if (phase === 'intro') {
    fill(248, 244, 234);
    textAlign(LEFT, TOP);
    textSize(19);
    text(pack.intro, mx + 32, my + 48, modalW - 64, 96);

    fill(164, 224, 255);
    textSize(14);
    text(`共 ${pack.questions.length} 題小學英文選擇題，支援語音朗讀與答題獎勵！`, mx + 32, my + 132);

    const startBtn = { x: mx + modalW - 210, y: my + modalH - 64, w: 178, h: 42 };
    quizUiHitboxes.primaryBtn = startBtn;
    drawQuizButton(startBtn, '開始挑戰 [E]', color(52, 146, 98), color(72, 178, 122));
  } else if (phase === 'question' || phase === 'feedback') {
    // 題號進度
    fill(238, 206, 126);
    textAlign(LEFT, TOP);
    textSize(14);
    text(`第 ${questionIndex + 1} / ${pack.questions.length} 題`, mx + 32, my + 30);

    // 聽發音按鈕（Web Speech API）
    if (q.speechText) {
      const speakBtn = { x: mx + 148, y: my + 24, w: 122, h: 28 };
      quizUiHitboxes.speakBtn = speakBtn;
      drawQuizButton(speakBtn, '🔊 聽發音 [R]', color(54, 96, 158), color(74, 124, 196), 12);
    }

    // 題目文字
    fill(255);
    textAlign(LEFT, TOP);
    textSize(21);
    text(q.question, mx + 32, my + 66, modalW - 64, 62);

    // 3 個選項按鈕
    const optStartY = my + 128;
    const optH = 44;
    const optGap = 12;

    q.options.forEach((optText, idx) => {
      const box = {
        index: idx,
        x: mx + 32,
        y: optStartY + idx * (optH + optGap),
        w: modalW - 64,
        h: optH
      };
      quizUiHitboxes.options.push(box);

      const isHovered = phase === 'question' && isPointInRect(mouseX, mouseY, box);
      let bgCol = isHovered ? color(66, 86, 134) : color(44, 42, 66);
      let borderCol = isHovered ? color(135, 220, 255) : color(130, 124, 162, 140);

      if (phase === 'feedback') {
        if (idx === q.answerIndex) {
          bgCol = color(42, 132, 82);
          borderCol = color(130, 255, 175);
        } else if (idx === selectedIndex && !isCorrect) {
          bgCol = color(152, 52, 58);
          borderCol = color(255, 140, 140);
        }
      }

      fill(bgCol);
      stroke(borderCol);
      strokeWeight(1.8);
      rect(box.x, box.y, box.w, box.h, 10);

      noStroke();
      fill(255, 224, 130);
      textAlign(LEFT, CENTER);
      textSize(16);
      text(`[${idx + 1}]`, box.x + 16, box.y + box.h / 2);

      fill(255);
      textSize(18);
      text(optText, box.x + 56, box.y + box.h / 2);
    });

    // 底部提示或回饋列
    if (phase === 'question') {
      fill(190, 206, 232);
      textAlign(LEFT, CENTER);
      textSize(13);
      text('點擊選項，或按鍵盤 1 / 2 / 3 作答（按 R 可重聽英文發音）', mx + 32, my + modalH - 34);
    } else {
      fill(isCorrect ? color(132, 255, 178) : color(255, 198, 122));
      textAlign(LEFT, CENTER);
      textSize(15);
      const prefix = isCorrect ? '✔ 答對了！' : '💡 沒關係，一起學起來：';
      text(`${prefix}${q.explanation}`, mx + 32, my + modalH - 38, modalW - 220, 44);

      const isLastQ = questionIndex >= pack.questions.length - 1;
      const nextBtn = { x: mx + modalW - 178, y: my + modalH - 56, w: 146, h: 38 };
      quizUiHitboxes.primaryBtn = nextBtn;
      drawQuizButton(nextBtn, isLastQ ? '看成績 [E]' : '下一題 [E]', color(54, 136, 186), color(74, 166, 220));
    }
  } else if (phase === 'complete') {
    const total = pack.questions.length;
    const passed = sessionCorrect >= Math.ceil(total * 0.5);

    fill(passed ? color(255, 224, 110) : color(255, 186, 122));
    textAlign(LEFT, TOP);
    textSize(22);
    text(passed ? `🎉 挑戰成功！答對 ${sessionCorrect} / ${total} 題` : `💪 繼續加油！答對 ${sessionCorrect} / ${total} 題`, mx + 32, my + 44);

    fill(244, 240, 232);
    textSize(16);
    text(passed ? pack.completeMsg : '再練習一次，你一定能全部答對喔！', mx + 32, my + 90, modalW - 64, 70);

    const finishBtn = { x: mx + modalW - 196, y: my + modalH - 64, w: 164, h: 42 };
    quizUiHitboxes.primaryBtn = finishBtn;
    drawQuizButton(finishBtn, '回到王城 [E]', color(52, 146, 98), color(72, 178, 122));
  }

  pop();
}

function drawQuizButton(box, label, baseCol, hoverCol, txtSize = 15) {
  const hovered = isPointInRect(mouseX, mouseY, box);
  noStroke();
  fill(hovered ? hoverCol : baseCol);
  rect(box.x, box.y, box.w, box.h, 8);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(txtSize);
  text(label, box.x + box.w / 2, box.y + box.h / 2);
}

function isPointInRect(px, py, r) {
  return Boolean(r) && px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h;
}

// ==========================================
// 鍵盤與滑鼠互動事件
// ==========================================
function keyPressed() {
  if (!player) return;

  // 若正在進行英文問答，優先由問答系統處理按鍵（避免與場景切換 1/2/3 衝突）
  if (activeQuiz) {
    if (keyCode === ESCAPE) {
      closeQuiz();
      return false;
    }

    if (activeQuiz.phase === 'question') {
      if (key === '1' || key === '2' || key === '3') {
        submitQuizAnswer(Number(key) - 1);
        return false;
      }
      if (key === 'r' || key === 'R') {
        const q = activeQuiz.pack.questions[activeQuiz.questionIndex];
        if (q && q.speechText) speakEnglish(q.speechText);
        return false;
      }
    } else if (key === 'e' || key === 'E' || key === ' ' || keyCode === ENTER) {
      advanceQuizFlow();
      return false;
    }

    if (key === 'r' || key === 'R') {
      const q = activeQuiz.pack.questions[activeQuiz.questionIndex];
      if (q && q.speechText) speakEnglish(q.speechText);
    }
    return false;
  }

  // 平時探索模式：按 E 與最近 NPC 開啟英文問答
  if (key === 'e' || key === 'E') {
    const nearbyNpc = findNearbyNpc();
    if (nearbyNpc) {
      startNpcQuiz(nearbyNpc);
    }
    return;
  }

  // 隱藏 / 顯示左上角介面
  if (key === 'h' || key === 'H') {
    showUI = !showUI;
  }

  // 跳躍
  if ((key === 'w' || key === 'W' || keyCode === UP_ARROW || key === ' ') && player.isGrounded) {
    player.jump();
    return false;
  }

  // 施法攻擊
  if (key === 'j' || key === 'J' || key === 'k' || key === 'K') {
    player.castMagic();
  }

  // 切換背景（B 循環切換，或按 1 / 2 / 3 直接選擇）
  if ((key === 'b' || key === 'B') && BG_CONFIG.length > 0) {
    currentBgIndex = (currentBgIndex + 1) % BG_CONFIG.length;
  }
  if (key >= '1' && key <= String(BG_CONFIG.length)) {
    currentBgIndex = Number(key) - 1;
  }

  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW || keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
    return false;
  }
}

function mousePressed() {
  // 問答視窗開啟時的點擊判定
  if (activeQuiz) {
    if (isPointInRect(mouseX, mouseY, quizUiHitboxes.closeBtn)) {
      closeQuiz();
      return;
    }

    if (isPointInRect(mouseX, mouseY, quizUiHitboxes.speakBtn)) {
      const q = activeQuiz.pack.questions[activeQuiz.questionIndex];
      if (q && q.speechText) speakEnglish(q.speechText);
      return;
    }

    if (activeQuiz.phase === 'question') {
      for (const optBox of quizUiHitboxes.options) {
        if (isPointInRect(mouseX, mouseY, optBox)) {
          submitQuizAnswer(optBox.index);
          return;
        }
      }
    } else if (isPointInRect(mouseX, mouseY, quizUiHitboxes.primaryBtn)) {
      advanceQuizFlow();
      return;
    }
    return;
  }

  // 平時探索模式：直接點擊任一 NPC 即可開始英文問答
  for (const npc of npcs) {
    if (abs(mouseX - npc.x) < 42 && mouseY < npc.y + 10 && mouseY > npc.y - 145) {
      startNpcQuiz(npc);
      return;
    }
  }
}

function findNearbyNpc() {
  let closestNpc = null;
  let minDist = 115;
  for (const npc of npcs) {
    const d = abs(player.x - npc.x);
    if (d < minDist) {
      minDist = d;
      closestNpc = npc;
    }
  }
  return closestNpc;
}

// ==========================================
// 中世紀 RPG 英文導師 NPC 類別 (NPC)
// ==========================================
class NPC {
  constructor(cfg) {
    this.id = cfg.id;
    this.name = cfg.name;
    this.title = cfg.title;
    this.role = cfg.role; // 'mage' | 'knight' | 'merchant'
    this.xRatio = cfg.xRatio;
    this.homeX = width * cfg.xRatio;
    this.x = this.homeX;
    this.y = cfg.y;
    this.patrolRange = cfg.patrolRange || 0;
    this.patrolDir = 1;
    this.facing = 1;
    this.speed = 0.7;
    this.quizKey = cfg.quizKey;
    this.questCompleted = false;
    this.isWalking = false;
  }

  onResize(newGroundY) {
    this.homeX = width * this.xRatio;
    this.x = constrain(this.x, this.homeX - this.patrolRange, this.homeX + this.patrolRange);
    this.y = newGroundY;
  }

  update(targetPlayer) {
    const isNear = targetPlayer && abs(targetPlayer.x - this.x) < 115;

    if (isNear || (activeQuiz && activeQuiz.npc === this)) {
      this.isWalking = false;
      if (targetPlayer) {
        this.facing = targetPlayer.x >= this.x ? 1 : -1;
      }
      return;
    }

    if (this.patrolRange > 0) {
      this.isWalking = true;
      this.x += this.speed * this.patrolDir;
      this.facing = this.patrolDir;

      if (this.x > this.homeX + this.patrolRange) {
        this.patrolDir = -1;
      } else if (this.x < this.homeX - this.patrolRange) {
        this.patrolDir = 1;
      }
    } else {
      this.isWalking = false;
    }
  }

  display(targetPlayer) {
    const isNear = targetPlayer && abs(targetPlayer.x - this.x) < 115;
    const bob = this.isWalking ? abs(sin(frameCount * 0.16)) * -4 : sin(frameCount * 0.08 + this.x) * 1.5;

    push();
    noStroke();
    fill(0, 0, 0, 68);
    ellipse(this.x, this.y + 4, 62, 15);
    pop();

    push();
    translate(this.x, this.y + bob);
    scale(this.facing, 1);

    if (this.role === 'mage') {
      this.drawMageAppearance();
    } else if (this.role === 'knight') {
      this.drawKnightAppearance();
    } else {
      this.drawMerchantAppearance();
    }
    pop();

    // 頭上名牌、任務圖示與互動氣泡
    push();
    textAlign(CENTER, BOTTOM);
    noStroke();

    fill(18, 16, 26, 170);
    rect(this.x - 52, this.y - 146, 104, 22, 6);
    fill(255, 232, 168);
    textSize(12);
    text(this.name, this.x, this.y - 129);

    // 英文挑戰任務標示（未完成：金色 !，完成：綠色 ✓）
    const floatY = sin(frameCount * 0.1) * 4;
    textSize(22);
    fill(this.questCompleted ? color(120, 245, 162) : color(255, 214, 64));
    text(this.questCompleted ? '✓' : '!', this.x, this.y - 152 + floatY);

    if (isNear && !activeQuiz) {
      fill(28, 24, 38, 230);
      stroke(236, 198, 108);
      strokeWeight(1.5);
      rect(this.x - 52, this.y - 186, 104, 26, 6);
      noStroke();
      fill(255, 238, 180);
      textSize(12);
      text('[E] 英文挑戰', this.x, this.y - 167);
    }
    pop();
  }

  drawMageAppearance() {
    noStroke();
    fill(92, 54, 142);
    quad(-18, -82, 18, -82, 24, -4, -24, -4);
    fill(228, 192, 92);
    rect(-4, -82, 8, 76);

    fill(248, 216, 188);
    circle(0, -96, 30);
    fill(242, 244, 248);
    triangle(-12, -88, 12, -88, 0, -60);
    fill(32);
    circle(6, -98, 4);

    fill(64, 36, 108);
    ellipse(0, -108, 48, 10);
    triangle(-18, -108, 16, -108, -6, -142);

    stroke(126, 82, 46);
    strokeWeight(4);
    line(20, -4, 24, -98);
    noStroke();
    fill(100, 232, 255, 130);
    circle(24, -104, 18 + sin(frameCount * 0.1) * 3);
    fill(210, 252, 255);
    circle(24, -104, 9);
  }

  drawKnightAppearance() {
    const legSwing = this.isWalking ? sin(frameCount * 0.2) * 10 : 0;

    stroke(102, 110, 126);
    strokeWeight(8);
    strokeCap(ROUND);
    line(-7, -30, -7 - legSwing, -4);
    line(7, -30, 7 + legSwing, -4);

    noStroke();
    fill(168, 42, 48);
    quad(-20, -82, -6, -82, -26, -18, -14, -18);
    fill(168, 178, 194);
    rect(-16, -84, 32, 54, 6);
    fill(218, 184, 86);
    rect(-16, -54, 32, 6);

    fill(186, 194, 208);
    rect(-14, -114, 28, 30, 10, 10, 4, 4);
    fill(34, 38, 48);
    rect(0, -104, 13, 6, 2);
    fill(204, 44, 52);
    ellipse(-4, -118, 26, 12);

    fill(64, 96, 166);
    stroke(224, 190, 96);
    strokeWeight(2.5);
    rect(10, -74, 20, 32, 4, 4, 12, 12);
    noStroke();
    fill(220, 228, 238);
    rect(-22, -98, 5, 42, 2);
    fill(216, 176, 78);
    rect(-28, -60, 17, 4);
  }

  drawMerchantAppearance() {
    const legSwing = this.isWalking ? sin(frameCount * 0.2) * 8 : 0;

    stroke(92, 64, 46);
    strokeWeight(7);
    strokeCap(ROUND);
    line(-6, -28, -6 - legSwing, -4);
    line(6, -28, 6 + legSwing, -4);

    noStroke();
    fill(124, 80, 48);
    rect(-26, -78, 16, 36, 5);
    fill(54, 128, 86);
    quad(-17, -80, 17, -80, 22, -16, -22, -16);
    fill(228, 206, 162);
    rect(-8, -76, 16, 52, 4);

    fill(255, 224, 196);
    circle(0, -96, 29);
    fill(34);
    circle(6, -97, 4);
    fill(188, 72, 62);
    arc(0, -98, 34, 30, PI, TWO_PI);

    fill(80, 185, 255);
    circle(18, -56, 14);
    fill(210, 240, 255);
    rect(15, -67, 6, 6);
  }
}

// ==========================================
// 互動練功稻草人 (TrainingDummy)
// ==========================================
class TrainingDummy {
  constructor(xRatio, y) {
    this.xRatio = xRatio;
    this.x = width * xRatio;
    this.y = y;
    this.shakeTimer = 0;
    this.hitCount = 0;
  }

  onResize(newGroundY) {
    this.x = width * this.xRatio;
    this.y = newGroundY;
  }

  checkHit(effect) {
    const hitX = abs(effect.x - this.x) < 38;
    const hitY = effect.y > this.y - 130 && effect.y < this.y - 10;
    if (!hitX || !hitY) return false;

    this.shakeTimer = 18;
    this.hitCount++;

    const isCrit = random() < 0.28;
    const dmg = isCrit ? floor(random(180, 260)) : floor(random(85, 145));

    spawnFloatingText(
      this.x + random(-16, 16),
      this.y - 125,
      isCrit ? `CRIT -${dmg}!` : `-${dmg}`,
      isCrit ? color(255, 214, 68) : color(135, 236, 255),
      isCrit ? 22 : 17
    );
    spawnBurstParticles(this.x, effect.y, isCrit ? color(255, 210, 75) : color(110, 225, 255), 14);

    return true;
  }

  update() {
    if (this.shakeTimer > 0) {
      this.shakeTimer--;
    }
  }

  display() {
    const tilt = this.shakeTimer > 0 ? sin(this.shakeTimer * 1.4) * 0.22 : 0;

    push();
    noStroke();
    fill(0, 0, 0, 65);
    ellipse(this.x, this.y + 4, 54, 14);

    translate(this.x, this.y);
    rotate(tilt);

    fill(104, 70, 44);
    rect(-6, -110, 12, 110);
    rect(-34, -84, 68, 10, 3);

    fill(this.shakeTimer > 12 ? color(255, 235, 195) : color(206, 168, 96));
    rect(-20, -96, 40, 56, 8);
    fill(196, 52, 52);
    circle(0, -68, 22);
    fill(248, 244, 234);
    circle(0, -68, 13);
    fill(196, 52, 52);
    circle(0, -68, 5);

    fill(218, 184, 118);
    circle(0, -110, 28);
    stroke(72, 50, 32);
    strokeWeight(2);
    line(-6, -113, -2, -109);
    line(-2, -113, -6, -109);
    line(2, -113, 6, -109);
    line(6, -113, 2, -109);

    noStroke();
    textAlign(CENTER, BOTTOM);
    fill(18, 16, 26, 165);
    rect(-40, -148, 80, 20, 6);
    fill(245, 226, 178);
    textSize(11);
    text(`練功靶 (${this.hitCount})`, 0, -133);
    pop();
  }
}

function updateAndDrawParticles() {
  noStroke();
  for (let i = hitParticles.length - 1; i >= 0; i--) {
    const pt = hitParticles[i];
    pt.x += pt.vx;
    pt.y += pt.vy;
    pt.vy += 0.14;
    pt.life--;

    const alpha = map(pt.life, 0, pt.maxLife, 0, 255);
    fill(red(pt.col), green(pt.col), blue(pt.col), alpha);
    circle(pt.x, pt.y, pt.size);

    if (pt.life <= 0) {
      hitParticles.splice(i, 1);
    }
  }
}

function updateAndDrawFloatingTexts() {
  push();
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  for (let i = floatingTexts.length - 1; i >= 0; i--) {
    const ft = floatingTexts[i];
    ft.y += ft.vy;
    ft.life--;

    const alpha = map(ft.life, 0, ft.maxLife, 0, 255);
    textSize(ft.size);
    fill(0, 0, 0, alpha * 0.7);
    text(ft.text, ft.x + 2, ft.y + 2);
    fill(red(ft.color), green(ft.color), blue(ft.color), alpha);
    text(ft.text, ft.x, ft.y);

    if (ft.life <= 0) {
      floatingTexts.splice(i, 1);
    }
  }
  pop();
}

// ==========================================
// 角色類別 (Character)
// ==========================================
class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.groundY = y;
    this.vx = 0;
    this.vy = 0;
    this.speed = 5;
    this.jumpForce = -14;
    this.gravity = 0.68;
    this.facing = 1;
    this.state = 'stop';

    this.frameIndex = 0;
    this.animSpeed = 0.18;
    this.isCasting = false;
  }

  get isGrounded() {
    return this.y >= this.groundY && this.vy >= 0;
  }

  setState(nextState) {
    if (this.state !== nextState) {
      this.state = nextState;
      this.frameIndex = 0;
    }
  }

  handleInput() {
    // 答題或施法時暫停移動，避免誤觸走開
    if (this.isCasting || activeQuiz) {
      this.vx = 0;
      if (!this.isCasting && this.isGrounded) {
        this.setState('stop');
      }
      return;
    }

    this.vx = 0;
    if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
      this.vx = -this.speed;
      this.facing = -1;
    } else if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
      this.vx = this.speed;
      this.facing = 1;
    }

    if (!this.isGrounded) {
      this.setState('jump');
    } else if (this.vx !== 0) {
      this.setState('walk');
    } else {
      this.setState('stop');
    }
  }

  jump() {
    this.vy = this.jumpForce;
    this.setState('jump');
  }

  castMagic() {
    if (this.isCasting) return;
    this.isCasting = true;
    this.vx = 0;
    this.setState('magic');

    const spawnX = this.x + this.facing * 52;
    const spawnY = this.y - (DISPLAY_CONFIG.characterHeight || 140) * 0.52;
    activeEffects.push(new MagicEffect(spawnX, spawnY, this.facing));
  }

  update() {
    this.x += this.vx;
    this.x = constrain(this.x, 50, width - 50);

    this.y += this.vy;
    if (this.y < this.groundY) {
      this.vy += this.gravity;
    } else {
      this.y = this.groundY;
      this.vy = 0;
    }

    const frameTotal = FRAME_COUNTS[this.state] || 1;
    this.frameIndex += this.animSpeed;

    if (this.state === 'magic') {
      if (this.frameIndex >= frameTotal) {
        this.isCasting = false;
        this.setState(this.isGrounded ? 'stop' : 'jump');
      }
    } else if (this.state === 'jump') {
      if (this.frameIndex >= frameTotal) {
        this.frameIndex = frameTotal - 1;
      }
    } else {
      this.frameIndex = this.frameIndex % frameTotal;
    }
  }

  displayShadow() {
    const heightAboveGround = max(0, this.groundY - this.y);
    const scaleFactor = constrain(1 - heightAboveGround / 260, 0.35, 1);

    push();
    noStroke();
    fill(0, 0, 0, 75 * scaleFactor);
    ellipse(this.x, this.groundY + 4, 80 * scaleFactor, 18 * scaleFactor);
    pop();
  }

  display() {
    const img = getValidFrame(this.state, this.frameIndex);

    push();
    translate(this.x, this.y);
    scale(this.facing, 1);

    if (img && img.width > 0 && img.height > 0) {
      if (DISPLAY_CONFIG.characterHeight) {
        const drawH = DISPLAY_CONFIG.characterHeight;
        const drawW = drawH * (img.width / img.height);
        image(img, 0, -drawH / 2, drawW, drawH);
      } else {
        image(img, 0, -img.height / 2);
      }
    } else {
      this.displayFallback();
    }

    pop();
  }

  displayFallback() {
    const t = frameCount * 0.14;
    const bob = this.state === 'stop' ? sin(t) * 3 : this.state === 'walk' ? abs(sin(t * 1.8)) * -5 : 0;
    const legSwing = this.state === 'walk' ? sin(t * 2.2) * 16 : this.state === 'jump' ? 12 : 0;

    push();
    translate(0, bob);

    stroke(45, 50, 78);
    strokeWeight(8);
    strokeCap(ROUND);
    line(-9, -32, -9 - legSwing, -4);
    line(9, -32, 9 + legSwing, -4);

    noStroke();
    fill(85, 105, 200);
    rect(-18, -86, 36, 54, 10);

    fill(255, 224, 196);
    circle(0, -104, 36);
    fill(30);
    circle(8, -106, 5);
    circle(15, -106, 5);

    fill(58, 48, 125);
    ellipse(0, -120, 56, 12);
    triangle(-20, -120, 18, -120, -4, -154);

    stroke(140, 90, 50);
    strokeWeight(5);
    line(18, -32, this.state === 'magic' ? 38 : 24, this.state === 'magic' ? -96 : -88);
    noStroke();
    fill(90, 230, 255, this.state === 'magic' ? 210 : 100);
    circle(this.state === 'magic' ? 38 : 24, this.state === 'magic' ? -98 : -90, this.state === 'magic' ? 22 : 12);
    pop();
  }
}

// ==========================================
// 施法特效類別 (MagicEffect)
// ==========================================
class MagicEffect {
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.speed = 9 * direction;
    this.frameIndex = 0;
    this.animSpeed = 0.22;
    this.lifeSpan = 180;
  }

  update() {
    this.x += this.speed;
    this.frameIndex += this.animSpeed;
    this.lifeSpan--;
  }

  isExpired() {
    return this.lifeSpan <= 0 || this.x < -120 || this.x > width + 120;
  }

  display() {
    const img = getValidFrame('effect', this.frameIndex % FRAME_COUNTS.effect);

    push();
    translate(this.x, this.y);
    scale(this.direction, 1);

    if (img && img.width > 0 && img.height > 0) {
      if (DISPLAY_CONFIG.effectHeight) {
        const drawH = DISPLAY_CONFIG.effectHeight;
        const drawW = drawH * (img.width / img.height);
        image(img, 0, 0, drawW, drawH);
      } else {
        image(img, 0, 0);
      }
    } else {
      noStroke();
      fill(80, 210, 255, 80);
      ellipse(-6, 0, 56, 30);
      fill(145, 115, 255, 180);
      ellipse(0, 0, 34, 22);
      fill(235, 252, 255);
      ellipse(6, 0, 16, 10);
    }

    pop();
  }
}

// ==========================================
// 視窗大小變更自動適配
// ==========================================
function windowResized() {
  const prevGroundY = getGroundY();
  resizeCanvas(windowWidth, windowHeight);
  const newGroundY = getGroundY();

  if (player) {
    const offsetFromGround = prevGroundY - player.y;
    player.groundY = newGroundY;
    player.y = player.groundY - offsetFromGround;
    player.x = constrain(player.x, 50, width - 50);
  }

  for (const npc of npcs) {
    npc.onResize(newGroundY);
  }
  if (trainingDummy) {
    trainingDummy.onResize(newGroundY);
  }
}
