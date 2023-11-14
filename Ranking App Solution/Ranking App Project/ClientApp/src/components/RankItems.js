import React, { useState, useEffect } from 'react';
import RankingGrid from './RankingGrid';
import ItemCollection from './ItemCollection';

const RankItems = ({ items, setItems, dataType, imgArr, localStorageKey }) => {
    const [reload, setReload] = useState(false);

    function Reload() {
        setReload(true);
    };

    useEffect(() => {
        if (items == null) {
            getDataFromApi();
        }
    }, [dataType]);

    function getDataFromApi() {
        fetch(`item/${dataType}`)
            .then(results => {
                return results.json();
            })
            .then(data => {
                setItems(data);
            })
    }

    useEffect(() => {
        if (items != null) {
            localStorage.setItem(localStorageKey, JSON.stringify(items));
        }
        setReload(false);
    }, [items]);

    useEffect(() => {
        if (reload) {
            getDataFromApi();
        }
    }, [reload]);

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
        items != null
        ? <main>
            <RankingGrid
                items={items}
                    imgArr={imgArr}
                drag={drag}
                allowDrop={allowDrop}
                drop={drop}
            />

            <ItemCollection items={items} drag={drag} imgArr={imgArr} />

                <button onClick={Reload} style={{"marginTop": "10px"} }>Reload</button>
        </main>
        : <main>Loading...</main>
    )
}

export default RankItems;
