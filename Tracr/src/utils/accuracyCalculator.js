export function interpolatePaths(path, gridSize = 30, padding = 1, svgSize = 300) {
  const grid = Array(gridSize).fill(0).map(() => Array(gridSize).fill(0));

  for (let i = 0; i < path.length - 1; i++) {
    const start = path[i];
    const end = path[i + 1];

    // Normalize coordinates back to 0-1 scale before mapping to grid
    const startX = start.x / svgSize;
    const startY = start.y / svgSize;
    const endX = end.x / svgSize;
    const endY = end.y / svgSize;

    const xDistance = endX - startX;
    const yDistance = endY - startY;

    const pointsDistance = Math.hypot(xDistance, yDistance);
    const gridCells = pointsDistance * gridSize
    const multiplier = 2

    const steps = Math.max(1, Math.ceil(gridCells * multiplier));

    // *2 increase sample-size just for safety
    // Math.max(1,..) ensure the loop runs at least once in worse case

    for (let step = 0; step <= steps; step++) {
      const interpolateX = startX + (xDistance * (step / steps));
      const interpolateY = startY + (yDistance * (step / steps));

      const gridX = Math.floor(interpolateX * gridSize);
      const gridY = Math.floor(interpolateY * gridSize);

      // Padding: Mark the cell and its neighbours, padding=1=center cell plus 1 cell in every direction
      for (let padX = -padding; padX <= padding; padX++) {
        for (let padY = -padding; padY <= padding; padY++) {
          const pointX = gridX + padX;
          const pointY = gridY + padY;
          // Safety check to make sure we don't try to mark a cell that is outside the grid, then mark it
          if (pointX >= 0 && pointX < gridSize && pointY >= 0 && pointY < gridSize) {
            grid[pointY][pointX] = 1; // Mark cell as "1"
          }
        }
      }
    }
  }
  return grid;
}

export function calculateHits(target, user) {
  let hits = 0;
  let totalTargetCells = 0;
  let missedCells = 0;

  for (let y = 0; y < target.length; y++) {
    for (let x = 0; x < target[y].length; x++) {
      if (target[y][x] === 1) {
        totalTargetCells++;
        if (user[y][x] === 1) {
          hits++;
        } else missedCells++;
      }
    }
  }

  const score = hits / totalTargetCells * 100;
  return score;
}