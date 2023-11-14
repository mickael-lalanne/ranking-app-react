
const RankingGrid = ({ items, imgArr }) => {
    const rankingGrid = [];
    const cellCollectionTop = [];
    const cellCollectionMiddle = [];
    const cellCollectionBottom = [];
    const cellCollectionWorst = [];

    function pushCellMarkupToArr(cellCollection, rankNum, rowLabel) {
        if (rankNum > 0) {
            let item = items.find(i => i.ranking === rankNum);
            cellCollection.push(<div id={`rank-${rankNum}`} className="rank-cell"></div>);
        } else {
            cellCollection.push(<div className="row-label">
                <h4>{rowLabel}</h4>
            </div>);
        }
    }

    function createCellsForRow(rowNum) {
        let rankNum = 0;
        let currentCollection = [];
        let label = '';
        const NUM_CELLS = 5;

        for (let cell = 1; cell <= NUM_CELLS; cell++) {
            rankNum = cell === 1 ? 0 : (NUM_CELLS * (rowNum - 1)) + cell - rowNum;

            switch (rowNum) {
                case 1:
                    currentCollection = cellCollectionTop;
                    label = 'Top Tier';
                    break;
                case 2:
                    currentCollection = cellCollectionMiddle;
                    label = 'Middle Tier';
                    break;
                case 3:
                    currentCollection = cellCollectionBottom;
                    label = 'Bottom Tier';
                    break;
                case 4:
                    currentCollection = cellCollectionWorst;
                    label = 'Worst Tier';
                    break;
                default:
                    break;
            }

            pushCellMarkupToArr(currentCollection, rankNum, label);
        }
    };

    function createCellsForRows() {
        const MAX_ROW = 4;
        for (let row = 0; row <= MAX_ROW; row++) {
            createCellsForRow(row);
        }
    };

    function createRowsForGrid() {
        rankingGrid.push(<div className="rank-row top-tier">{cellCollectionTop}</div>);
        rankingGrid.push(<div className="rank-row middle-tier">{cellCollectionMiddle}</div>);
        rankingGrid.push(<div className="rank-row bottom-tier">{cellCollectionBottom}</div>);
        rankingGrid.push(<div className="rank-row worst-tier">{cellCollectionWorst}</div>);

        return rankingGrid;
    };

    function createRankingGrid() {
        createCellsForRows();
        return createRowsForGrid();
    };

    return (
        <div className="ranking-grid">
            { createRankingGrid() }
        </div>
    );
};

export default RankingGrid;
