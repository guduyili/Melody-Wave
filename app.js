// 创建一个新的 Audio 对象，并将其音频源设置为 'audio/1.mp3'
const music = new Audio('audio/1.mp3');
// 注释掉的代码：music.play(); 表示音频的播放

// 定义一个歌曲对象数组，每个对象包含歌曲的ID、名称和海报图片路径
const songs = [
    {
        id: "1",
        songName: 'Beautiful World <br><div class="subtitle">宇多田</div>',
        poster: "img/1.jpg"
    },
    {
        id: "2",
        songName: 'One Last Kiss <br><div class="subtitle">宇多田</div>',
        poster: "img/2.jpg"
    },
    {
        id: "3",
        songName: '言って <br><div class="subtitle">ヨルシカ</div>',
        poster: "img/3.jpg"
    },
    {
        id: "4",
        songName: '斜陽 <br><div class="subtitle">ヨルシカ</div>',
        poster: "img/4.jpg"
    },
    {
        id: "5",
        songName: '星座になれたら <br><div class="subtitle">結束バンド</div>',
        poster: "img/5.jpg"
    },
    {
        id: "6",
        songName: '転がる岩、君に朝が降る <br><div class="subtitle">結束バンド</div>',
        poster: "img/6.jpg"
    },
    {
        id: "7",
        songName: '送り狼 <br><div class="subtitle">natsumi</div>',
        poster: "img/7.jpg"
    },
    {
        id: "8",
        songName: 'カタオモイ - From THE FIRST TAKE <br><div class="subtitle">Aimer</div>',
        poster: "img/8.jpg"
    },
    {
        id: "9",
        songName: '青春コンプレックス <br><div class="subtitle">結束バンド</div>',
        poster: "img/9.jpg"
    },
    {
        id: "10",
        songName: 'Sincerely <br><div class="subtitle">TRUE</div>',
        poster: "img/10.jpg"
    },
    {
        id: "11",
        songName: 'βίος <MK+nZk Version> <br><div class="subtitle">小林未郁</div>',
        poster: "img/11.jpg"
    },
]

// 遍历所有具有 'songItem' 类的元素，将每个元素的图片和标题设置为歌曲数组中的对应值
Array.from(document.getElementsByClassName('songItem')).forEach((e, i) => {
    e.getElementsByTagName('img')[0].src = songs[i].poster;
    e.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
})

// 获取播放控制按钮和音波动画的 DOM 元素
let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementById('wave');

// 为播放控制按钮添加点击事件监听器
masterPlay.addEventListener('click', () => {
    // 如果音乐是暂停状态或者当前时间小于等于 0，则播放音乐
    if (music.paused || music.currentTime <= 0) {
        music.play();
        wave.classList.add('active1'); // 添加动画效果
        masterPlay.classList.remove('fa-play'); // 更改按钮图标为暂停图标
        masterPlay.classList.add('fa-pause');
    } else {
        music.pause(); // 否则暂停音乐
        wave.classList.remove('active1'); // 移除动画效果
        masterPlay.classList.remove('fa-pause'); // 更改按钮图标为播放图标
        masterPlay.classList.add('fa-play');
    }
});



const makeAllplays = ()=>{
    Array.from(document.getElementsByClassName('playListPlay')).forEach((el)=>{
        el.classList.remove('fa-pause'); // 更改按钮图标为播放图标
        el.classList.add('fa-play');
    });
}



const makeAllBackground = ()=>{
    Array.from(document.getElementsByClassName('songItem')).forEach((el)=>{
            el.style.background = 'rgb(105,105,105,.0)';
    });
}

// 初始化索引和获取主播放海报和标题的 DOM 元素
let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');

// 遍历所有具有 'playListPlay' 类的元素，为每个元素添加点击事件监听器
Array.from(document.getElementsByClassName('playListPlay')).forEach((e) => {
    e.addEventListener('click', (el) => {
        index = el.target.id; // 获取点击目标的 ID 并设置为索引

        // 更改音乐源和海报图片路径
        music.src = `audio/${index}.mp3`;
        poster_master_play.src = `img/${index}.jpg`;
        music.play(); // 播放音乐
        masterPlay.classList.remove('fa-play'); // 更改按钮图标为暂停图标
        masterPlay.classList.add('fa-pause');

        // 过滤出与当前索引匹配的歌曲并更新标题
        let songTitles = songs.filter((els) => {
            return els.id == index;
        });
        songTitles.forEach(elss => {
            let { songName } = elss;
            title.innerHTML = songName;
        });


        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[index-1].style.background = 'rgb(105,105,105,.1)';
        makeAllplays();
        el.target.classList.add('fa-pause');
        el.target.classList.remove('fa-play');
    });


});


let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];




music.addEventListener('timeupdate',()=>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;
    
    let min1 = Math.floor(music_dur/60);
    let sec1 = Math.floor(music_dur%60);
    

    let cur1 = Math.floor(music_curr/60);
    let cur2 = Math.floor(music_curr%60);
    //  console.log(min1);

    if(sec1 <10){
        sec1 = `0${sec1}`;
    }

    if(cur2 < 10){
        cur2 = `0${cur2}`;
    }
    currentEnd.innerText = `${min1}:${sec1}`;
    currentStart.innerText = `${cur1}:${cur2}`;


    let progressBar = parseInt((music_curr / music_dur) * 100);
    seek.value = progressBar;
    //  console.log(seek.value);

    let seekbar = seek.value;

    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;

});



seek.addEventListener('change',()=>{
    music.currentTime = seek.value * music.duration /100;
});

let vol_icon = document.getElementById('vol_icon');
let vol= document.getElementById('vol');
let vol_bar= document.getElementsByClassName('vol_bar')[0];
let vol_dot= document.getElementById('vol_dot');

vol.addEventListener('change',()=>{
    if(vol.value == 0){
        vol_icon.classList.remove('fa-volume-high');
        vol_icon.classList.add('fa-volume-xmark');
        vol_icon.classList.remove('fa-volume-low');
    }

    if(vol.value >0){
        vol_icon.classList.remove('fa-volume-high');
        vol_icon.classList.remove('fa-volume-xmark');
        vol_icon.classList.add('fa-volume-low');
    }
    if(vol.value > 50){
        vol_icon.classList.add('fa-volume-high');
        vol_icon.classList.remove('fa-volume-xmark');
        vol_icon.classList.remove('fa-volume-low');
    }


    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;

    music.volume = vol_a/100;
});



let back  = document.getElementById('back');
let next  = document.getElementById('next');

back.addEventListener('click',()=>{
    index -= 1;

    if(index < 1){
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }

    music.src = `audio/${index}.mp3`;
    poster_master_play.src = `img/${index}.jpg`;
    music.play(); // 播放音乐
    masterPlay.classList.remove('fa-play'); // 更改按钮图标为暂停图标
    masterPlay.classList.add('fa-pause');

    // 过滤出与当前索引匹配的歌曲并更新标题
    let songTitles = songs.filter((els) => {
        return els.id == index;
    });
    songTitles.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;
    });


    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index-1].style.background = 'rgb(105,105,105,.1)';
    makeAllplays();
    el.target.classList.add('fa-pause');
    el.target.classList.remove('fa-play');
});
next.addEventListener('click',()=>{
    index ++;

    if(index > Array.from(document.getElementsByClassName('songItem')).length){
        index = 1;
    }

    music.src = `audio/${index}.mp3`;
    poster_master_play.src = `img/${index}.jpg`;
    music.play(); // 播放音乐
    masterPlay.classList.remove('fa-play'); // 更改按钮图标为暂停图标
    masterPlay.classList.add('fa-pause');

    // 过滤出与当前索引匹配的歌曲并更新标题
    let songTitles = songs.filter((els) => {
        return els.id == index;
    });
    songTitles.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;
    });


    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index-1].style.background = 'rgb(105,105,105,.1)';
    makeAllplays();
    el.target.classList.add('fa-pause');
    el.target.classList.remove('fa-play');
});



