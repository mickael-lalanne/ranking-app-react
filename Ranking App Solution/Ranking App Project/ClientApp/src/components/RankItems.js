import React, { useState, useEffect } from 'react';
import movieImageArr from './MovieImages';
import RankingGrid from './RankingGrid';

const RankItems = () => {
    const [items, setItems] = useState([]);
    const dataType = 1;

    useEffect(() => {
        fetch(`item/${dataType}`)
            .then(results => {
                return results.json();
            })
            .then(data => {
                setItems(data);
            })
    }, []);

    return (
        <main>
            <RankingGrid items={items} imgArr={movieImageArr} />

            <div className="items-not-ranked">
            {
                    (items.length > 0) ? items.map(item =>
                        <div className="unranked-cell">
                            <img
                                id={`item-${item.id}`}
                                src={movieImageArr.find(movie => movie.id === item.imageId)?.image}
                            ></img>
                        </div>
                    ) : <div>Loading...</div>
            }
            </div>
        </main>
    )
}

export default RankItems;
