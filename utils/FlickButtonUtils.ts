export enum FlickDirection {
    Up = 1,
    Left,
    Down,
    Center,
    Right,
}

export function determineDirection(
    dx: number,
    dy: number,
    threshold: number,
): FlickDirection {
    const isNotFlickSufficient: boolean = Math.abs(dx) < threshold && Math.abs(dy) < threshold;

    if (isNotFlickSufficient) {
        return FlickDirection.Center;
    }

    const isVerticalFlick: boolean = Math.abs(dy) > Math.abs(dx);
            
    if (isVerticalFlick) {
        const isUpwardFlick: boolean = dy < 0;

        if (isUpwardFlick) {
            return FlickDirection.Up;
        } else {
            return FlickDirection.Down;
        }
    } else {
        const isLeftwardFlick: boolean = dx < 0;

        if (isLeftwardFlick) {
            return FlickDirection.Left;
        } else {
            return FlickDirection.Right;
        }
    }
}

export function getValueByDirection(
    currDirection: FlickDirection,
    upValue: string,
    leftValue: string,
    centerValue: string,
    rightValue: string,
    downValue: string,
) {
    const DirectionValueMap = {
        [FlickDirection.Up]: upValue,
        [FlickDirection.Left]: leftValue,
        [FlickDirection.Center]: centerValue,
        [FlickDirection.Right]: rightValue,
        [FlickDirection.Down]: downValue,
    };

    return DirectionValueMap[currDirection];
}