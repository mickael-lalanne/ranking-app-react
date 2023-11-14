import React, { useState, useEffect } from 'react';
import movieImageArr from './MovieImages';
import RankingGrid from './RankingGrid';
import ItemCollection from './ItemCollection';

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

    function drag(ev) {
        ev.dataTransfer.setData('text', ev.target.id);
    };

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drop(ev) {
        ev.preventDefault();

        const targetElt = ev.target;

        if (targetElt.nodeName === 'IMG') {
            return false;
        }

        if (targetElt.childNodes.length === 0) {
            let data = parseInt(ev.dataTransfer.getData('text').substring(5));
            const transformedCollection = items.map(item => item.id === parseInt(data)
                ? { ...item, ranking: parseInt(targetElt.id.substring(5)) }
                : { ...item, ranking: item.ranking }
            );

            setItems(transformedCollection);
        }
    }

    return (
        <main>
            <RankingGrid
                items={items}
                imgArr={movieImageArr}
                drag={drag}
                allowDrop={allowDrop}
                drop={drop}
            />

            <ItemCollection items={items} drag={drag} imgArr={movieImageArr} />
        </main>
    )
}

export default RankItems;
