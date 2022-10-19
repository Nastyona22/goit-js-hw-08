import Player from '@vimeo/player';
import { save, load, remove } from './storage';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player', {
    id: 'vimeo-player',
    width: 640
});
   
const LOCAL_STORAGE_KEY = "videoplayer-current-time";

const onPlay = function(data) {
    const currentTime = data.seconds;
    save(LOCAL_STORAGE_KEY, currentTime);
};

player.on('timeupdate', throttle(onPlay,1000));

const currentTime = load(LOCAL_STORAGE_KEY);

function resumeFromStop() {
    player.setCurrentTime(currentTime)
}
player.on('play', resumeFromStop);
