function createBoundingBox(coords) {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (let point of coords) {
        if (point[0] < minX) {
            minX = point[0];
        }
        if (point[0] > maxX) {
            maxX = point[0];
        }
        if (point[1] < minY) {
            minY = point[1];
        }
        if (point[1] > maxY) {
            maxY = point[1];
        }
    }
    return { minX, minY, maxX, maxY };
}

function normaliseTraceCoords(coords, boundingBox, svgWidth, svgHeight) {
    const width = boundingBox.maxX - boundingBox.minX;
    const height = boundingBox.maxY - boundingBox.minY;
    const padding = 0.1;

    const widthMinusPadding = svgWidth * (1 - padding);
    const heightMinusPadding = svgHeight * (1 - padding);

    const scale = Math.min(
        widthMinusPadding / width,
        heightMinusPadding / height,
    );

    const xOffset = (svgWidth - width * scale) / 2;
    const yOffset = (svgHeight - height * scale) / 2;

    const normalisedRoute = coords.map((point) => {
        const normalisedPoint = {
            x: (point[0] - boundingBox.minX) * scale + xOffset,
            y: ((point[1] - boundingBox.minY) * scale + yOffset),
        };

        return normalisedPoint;
    });

    return normalisedRoute;
}

function parseCoords(coords) {
    let parsedCoords = "";
    for (let point of coords) {
        const x = point.x.toFixed(4);
        const y = point.y.toFixed(4);
        parsedCoords += `${x} ${y}, `;
    }

    return parsedCoords;
}

export function createSvg(coordinates, size) {
    const boundingBox = createBoundingBox(coordinates);
    const points = normaliseTraceCoords(coordinates, boundingBox, size, size);

    console.log("POINTS", points)
    console.log("svgString", parseCoords(points))
    return {
        points: points, // Array of {x: , y: }
        svgString: parseCoords(points) // The string for <Polyline /> e.g. "150.0000 280.7813, 90.9375 238.5938,..."
    };
}