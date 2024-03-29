import { Directions, PlacementDirections } from '@app/classes/board-model/constants';
import { BoardNode } from './board-node';
import { LinkInterface } from './link-interface';

export class NodeLink {
    private linkDirection: LinkInterface;
    private firstNode: BoardNode;
    private secondNode: BoardNode;
    private isCommitted = false;
    constructor(firstNode: BoardNode, secondNode: BoardNode, direction: PlacementDirections) {
        this.firstNode = firstNode;
        this.secondNode = secondNode;
        this.setDirections(direction);
    }
    unlink() {
        if (this.isCommitted) return;
        this.firstNode.unLink(this.linkDirection.secondNodeDirection, this);
        this.secondNode.unLink(this.linkDirection.firstNodeDirection, this);
    }
    commitLink() {
        this.isCommitted = true;
    }
    isFinal() {
        return this.isCommitted;
    }
    getLinkedNode(node: BoardNode): BoardNode | undefined {
        switch (node) {
            case this.firstNode:
                return this.secondNode;
            case this.secondNode:
                return this.firstNode;
            default:
                return;
        }
    }
    checkIsPart(node: BoardNode) {
        return node === this.firstNode || node === this.secondNode;
    }
    private setDirections(placementDirection: PlacementDirections) {
        switch (placementDirection) {
            case PlacementDirections.Horizontal:
                this.linkDirection = { firstNodeDirection: Directions.Left, secondNodeDirection: Directions.Right };
                break;
            case PlacementDirections.Vertical:
                this.linkDirection = { firstNodeDirection: Directions.Up, secondNodeDirection: Directions.Down };
                break;
        }
    }
}
