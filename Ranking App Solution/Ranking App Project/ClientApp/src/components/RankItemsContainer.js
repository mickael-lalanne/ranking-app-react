import { useState } from 'react';
import RankItems from './RankItems';

const RankItemsContainer = ({ dataType, imgArr }) => {
    const ALBUM_LOCAL_STORAGE_KEY = 'albums';
    const MOVIE_LOCAL_STORAGE_KEY = 'movies';

    let localStorageKey = '';

    const [albumItems, setAlbumItems] = useState(JSON.parse(localStorage.getItem(ALBUM_LOCAL_STORAGE_KEY)));
    const [movieItems, setMovieItems] = useState(JSON.parse(localStorage.getItem(MOVIE_LOCAL_STORAGE_KEY)));

    let data = [];
    let setFunc = null;

    if (dataType === 1) {
        data = movieItems;
        setFunc = setMovieItems;
        localStorageKey = MOVIE_LOCAL_STORAGE_KEY;
    }
    else if (dataType === 2) {
        data = albumItems;
        setFunc = setAlbumItems;
        localStorageKey = ALBUM_LOCAL_STORAGE_KEY;
    }

    return (
        <RankItems items={data} setItems={setFunc} dataType={dataType} imgArr={imgArr} localStorageKey={localStorageKey} />
    );
};

export default RankItemsContainer;