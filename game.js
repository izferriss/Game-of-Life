document.addEventListener("DOMContentLoaded", () =>
{
    const canvas = document.querySelector("#board");
    const ctx = canvas.getContext("2d");

    const GRID_HEIGHT = 800;
    const GRID_WIDTH = GRID_HEIGHT;
    
    const RES = 5;
    const COL = GRID_WIDTH / RES;
    const ROW = GRID_HEIGHT / RES;
	const FPS = 12;

    canvas.width = GRID_WIDTH;
    canvas.height = GRID_HEIGHT;

    let grid = createGrid(COL, ROW);

    requestAnimationFrame(update);

    function update()
	{
		grid = nextGen(grid);
		drawGrid(grid, COL, ROW, RES);
		setTimeout(function(){requestAnimationFrame(update);}, 1000 / FPS);
    }

    function createGrid(cols, rows)
    {
        return new Array(cols).fill(null).map(() => new Array(rows).fill(null).map(() => Math.round(Math.random())));
    }

    function drawGrid(grid, cols, rows, resolution)
    {
        ctx.clearRect(0, 0, cols, rows);
        for (let i = 0; i < cols; i++)
        {
            for (let j = 0; j < rows; j++)
            {
                const cell = grid[i][j];
                ctx.fillStyle = cell ? "#000000" : "#ffffff";
                ctx.fillRect(i * resolution, j * resolution, resolution, resolution);
            }
        }
    }

    function nextGen(grid)
    {
        const nextGen = grid.map((arr) => [...arr]);

        for (let col = 0; col < grid.length; col++)
        {
            for (let row = 0; row < grid[col].length; row++)
            {
                const currentCell = grid[col][row];
                let sumNeighbors = 0;

                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++)
                    {
                        if (i === 0 && j === 0)
                        {
                            continue;
                        }

                        const x = col + i;
                        const y = row + j;

                        if (x >= 0 && y >= 0 && x < COL && y < ROW)
                        {
                            const currentNeighbor = grid[col + i][row + j];
                            sumNeighbors += currentNeighbor;
                        }
                    }
                }

                if (currentCell === 0 && sumNeighbors === 3)
                {
                    nextGen[col][row] = 1;
                }
                else if (currentCell === 1 && (sumNeighbors < 2 || sumNeighbors > 3))
                {
                    nextGen[col][row] = 0;
                }
            }
        }

        return nextGen;
    }
});