const music = new Audio('Alan Walker-Faded.mp3');
// music.play();

const songs = [{
        id: '1',
        songName: ` Faded <br>
        <div class="subtitle">Alan Walker</div> `,
        poster: "img/Faded.jpg"
    },
    {
        id: '2',
        songName: ` Fikar not <br>
        <div class="subtitle">Arjit Singh</div> `,
        poster: "img/Chhichhore.jpg"
    },
    {
        id: '3',
        songName: ` Levitating <br>
        <div class="subtitle">Dua Lipa</div> `,
        poster: "img/Levitating.jpg",
        songs: "Songs/Levitating.mp3"
    },
    {
        id: '4',
        songName: ` Paint The Town Red <br>
        <div class="subtitle">Doja Cat</div> `,
        poster: "img/Paint The Town Red.jpg",
    },
    {
        id: '5',
        songName: ` Dandelions <br>
        <div class="subtitle">Ruth B</div> `,
        poster: "img/Dandelions.jpg",
    },
    {
        id: '6',
        songName: ` Attention <br>
        <div class="subtitle">Charlie Puth</div> `,
        poster: "img/Attention.jpeg",
    },
    {
        id: '7',
        songName: ` Sunflower <br>
        <div class="subtitle">Post Malone, Swae Lee</div> `,
        poster: "img/Sunflower.jpg",
    },
    {
        id: '8',
        songName: ` Believer <br>
        <div class="subtitle">Imagine Dragons</div> `,
        poster: "img/Believer.jpg",
    },
    {
        id: '9',
        songName: ` Shameless <br>
        <div class="subtitle">Camila Cabello</div> `,
        poster: "img/Shameless.jpg",
    },
    {
        id: '10',
        songName: ` Wolves <br>
        <div class="subtitle">Selena Gomez, Marshmello</div> `,
        poster: "img/Wolves.jpg",
    },
    {
        id: '11',
        songName: ` Despacito <br>
        <div class="subtitle">Luis Fonsi ft. Daddy Yankee</div> `,
        poster: "img/Despacito.jpeg",
    },
    {
        id: '12',
        songName: ` Pehle Bhi Main <br>
        <div class="subtitle">Vishal Mishra</div> `,
        poster: "img/Animal.jpg",
    },
    {
        id: '13',
        songName: ` Main Tera Boyfriend <br>
        <div class="subtitle">Arjit Singh</div> `,
        poster: "img/Raabta.jpg",
    },
    {
        id: '14',
        songName: ` Kesariya <br>
        <div class="subtitle">Arjit Singh</div> `,
        poster: "img/Brahmastra.jpeg",
    },
    {
        id: '15',
        songName: ` Apna Bana Le <br>
        <div class="subtitle">Apna Bana Le</div> `,
        poster: "img/Bhediya.jpg",
    },
    {
        id: '16',
        songName: ` Sooraj Dooba Hain <br>
        <div class="subtitle">Sooraj Dooba Hain</div> `,
        poster: "img/Sooraj Dooba Hain.jpg",
    }
]

Array.from(document.getElementsByClassName('songItem')).forEach((e, i) => {
    e.getElementsByTagName('img')[0].src = songs[i].poster;
    e.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
});

let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementById('wave');

masterPlay.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        wave.classList.add('active1');
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
    } else {
        music.pause();
        wave.classList.remove('active1');
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
    }
});

const makeAllplays = () => {
    Array.from(document.getElementsByClassName('playListPlay')).forEach((el) => {
        el.classList.add('bi-play-circle-fill');
        el.classList.remove('bi-pause-circle-fill');
    })
}
const makeAllBackground = () => {
    Array.from(document.getElementsByClassName('songItem')).forEach((el) => {
        el.style.background = 'rgb(105, 105, 105, 0)';
    })
}

let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let download_music = document.getElementById('download_music');
let title = document.getElementById('title');

Array.from(document.getElementsByClassName('playListPlay')).forEach((e) => {
    e.addEventListener('click', (el) => {
        index = el.target.id;
        // console.log(index);
        music.src = `Songs/${index}.mp3`;
        poster_master_play.src = `img/${index}.jpg`;
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        download_music.href =  `audio/${index}.mp3`;
        let songTitles = songs.filter((els) => {
            return els.id == index;
        });

        songTitles.forEach(elss => {
            let { songName } = elss;
            title.innerHTML = songName;
            download_music.setAttribute('download', songName);
        });

        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)";
        makeAllplays();
        el.target.classList.remove('bi-play-circle-fill');
        el.target.classList.add('bi-pause-circle-fill');
        wave.classList.add('active1');
    });
})

let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate', () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min1 = Math.floor(music_dur / 60);
    let sec1 = Math.floor(music_dur % 60);

    // console.log(min1);
    if (sec1 < 10) {
        sec1 = `0${sec1}`;
    }
    currentEnd.innerText = `${min1}:${sec1}`;

    let min2 = Math.floor(music_curr / 60);
    let sec2 = Math.floor(music_curr % 60);
    if (sec2 < 10) {
        sec2 = `0${sec2}`;
    }
    currentStart.innerText = `${min2}:${sec2}`;


    let progressBar = parseInt((music_curr / music_dur) * 100);
    seek.value = progressBar;
    // console.log(seek.value);
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
});

seek.addEventListener('change', () => {
    music.currentTime = seek.value * music.duration / 100;
});


let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_bar = document.getElementsByClassName('vol_bar')[0];
let vol_dot = document.getElementById('vol_dot');

vol.addEventListener('change', () => {
    if (vol.value == 0) {
        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-off-fill');
    }
    if (vol.value > 0) {
        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-off-fill');
    }
    if (vol.value > 50) {
        vol_icon.classList.add('bi-volume-up-fill');
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-off-fill');
    }
    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a / 100;
});

let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', () => {
    index -= 1;
    if (index < 1) {
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }
    music.src = `audio/${index}.mp3`;
    poster_master_play.src = `img/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');

    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;
    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)";
    makeAllplays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
})

next.addEventListener('click', () => {
    index++;
    if (index > Array.from(document.getElementsByClassName('songItem')).length) {
        index = 1;
    }
    music.src = `audio/${index}.mp3`;
    poster_master_play.src = `img/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');

    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;
    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)";
    makeAllplays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
});

let pop_song_left = document.getElementById('pop_song_left');
let pop_song_right = document.getElementById('pop_song_right');
let pop_song = document.getElementsByClassName('pop_song')[0];

pop_song_right.addEventListener('click', () => {
    pop_song.scrollLeft += 330;
});
pop_song_left.addEventListener('click', () => {
    pop_song.scrollLeft -= 330;
});

let pop_art_left = document.getElementById('pop_art_left');
let pop_art_right = document.getElementById('pop_art_right');
let Artists_bx = document.getElementsByClassName('Artists_bx')[0];


pop_art_right.addEventListener('click', () => {
    Artists_bx.scrollLeft += 330;
});
pop_art_left.addEventListener('click', () => {
    Artists_bx.scrollLeft -= 330;
});



        let search_result = document.getElementsByClassName('search_result')[0];

        songs.forEach(element => {
            const {id, songName, poster, src} = element;
            let card = document.createElement('a');
            card.classList.add('card');
            card.href = '#' + id;
            card.dataset.src = src;                                                 // Store the song source in a data attribute
            card.innerHTML = `
                                <img src="${poster}" alt="">
                                        <div class="content">
                                        ${songName}
                                        ${songs}
                                        </div>    
                                        `;      

                        search_result.appendChild(card);
        });

let input = document.getElementsByTagName('input')[0];

input.addEventListener('keyup', ()=> {
    let input_value = input.value.toUpperCase();
    let items = search_result.getElementsByTagName('a');

    for (let i=0; i < items.length; i++) {
         let as = items[i].getElementsByClassName('content')[0];
         let text_value = as.textContent || as.innerText;   
         
        if (text_value.toUpperCase().indexOf(input_value) > -1) {
            items[i].style.display = "flex";    
        } else {
            items[i].style.display = "none";
        }

        if (input.value == 0) {
            search_result.style.display = "none";
        } else {
            search_result.style.display = "";
        }

    }
});

