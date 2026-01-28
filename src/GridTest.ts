class GridTest extends egret.DisplayObjectContainer {
	private gff: GridFlowField;
	private am: AgentManager;
	private enemyCtn: egret.Sprite;
	private mapCtn: egret.Sprite;
	private gameCtn: egret.Sprite;
	private obstacleArray: { col: number; row: number }[] = [
		{ col: 3, row: 5 }, { col: 7, row: 2 }, { col: 12, row: 9 }, { col: 1, row: 11 }, { col: 18, row: 4 },
		{ col: 9, row: 7 }, { col: 5, row: 13 }, { col: 15, row: 0 }, { col: 8, row: 8 }, { col: 11, row: 6 },
		{ col: 2, row: 1 }, { col: 17, row: 10 }, { col: 4, row: 14 }, { col: 10, row: 3 }, { col: 6, row: 12 },
		{ col: 14, row: 5 }, { col: 0, row: 9 }, { col: 19, row: 7 }, { col: 13, row: 1 }, { col: 16, row: 8 },
		{ col: 7, row: 14 }, { col: 9, row: 0 }, { col: 1, row: 4 }, { col: 5, row: 10 }, { col: 12, row: 13 },
		{ col: 8, row: 2 }, { col: 18, row: 11 }, { col: 3, row: 6 }, { col: 11, row: 12 }, { col: 4, row: 0 },
		{ col: 15, row: 9 }, { col: 2, row: 7 }, { col: 17, row: 3 }, { col: 10, row: 14 }, { col: 6, row: 5 },
		{ col: 14, row: 1 }, { col: 0, row: 8 }, { col: 19, row: 10 }, { col: 13, row: 4 }, { col: 16, row: 13 },
		{ col: 7, row: 6 }, { col: 9, row: 11 }, { col: 1, row: 1 }, { col: 5, row: 3 }, { col: 12, row: 12 },
		{ col: 8, row: 14 }, { col: 18, row: 0 }, { col: 3, row: 9 }, { col: 11, row: 4 }, { col: 4, row: 7 }
	];

	private enemyDataList = [
		{ x: 130, y: 136, rotation: 30 },
		{ x: 150, y: 220 },
		{ x: 180, y: 190, rotation: 60 },
		{ x: 210, y: 250, rotation: 90 },
		{ x: 240, y: 210 },
		{ x: 270, y: 280, rotation: 120 },
		{ x: 300, y: 240, rotation: 150 },
		{ x: 330, y: 300 },
		{ x: 360, y: 270, rotation: 180 },
		{ x: 390, y: 330, rotation: 210 },
		{ x: 420, y: 300 },
		{ x: 450, y: 360, rotation: 240 },
		{ x: 480, y: 330, rotation: 270 },
		{ x: 510, y: 390 },
		{ x: 540, y: 360, rotation: 300 },
		{ x: 570, y: 420, rotation: 330 },
		{ x: 600, y: 390 },
		{ x: 630, y: 450, rotation: 0 },
		{ x: 660, y: 420, rotation: 45 },
		{ x: 690, y: 480 },
		{ x: 720, y: 450, rotation: 75 },
		{ x: 750, y: 510, rotation: 105 },
		{ x: 780, y: 480 },
		{ x: 740, y: 540, rotation: 135 },
		{ x: 710, y: 510, rotation: 165 },
		{ x: 680, y: 570 },
		{ x: 650, y: 540, rotation: 195 },
		{ x: 620, y: 600, rotation: 225 },
		{ x: 590, y: 570 },
		{ x: 560, y: 630, rotation: 255 },
		{ x: 530, y: 600, rotation: 285 },
		{ x: 500, y: 660 },
		{ x: 470, y: 630, rotation: 315 },
		{ x: 440, y: 690, rotation: 345 },
		{ x: 410, y: 660 },
		{ x: 380, y: 720, rotation: 20 },
		{ x: 350, y: 690, rotation: 50 },
		{ x: 320, y: 750 },
		{ x: 290, y: 720, rotation: 80 },
		{ x: 260, y: 780, rotation: 110 },
		{ x: 230, y: 750 },
		{ x: 200, y: 810, rotation: 140 },
		{ x: 170, y: 780, rotation: 170 },
		{ x: 140, y: 840 },
		{ x: 110, y: 810, rotation: 200 },
		{ x: 80, y: 870, rotation: 230 },
		{ x: 50, y: 840 },
		{ x: 90, y: 770, rotation: 260 },
		{ x: 130, y: 740, rotation: 290 },
		{ x: 170, y: 710 }
	];

	private readonly ENEMY_TEXTURE_NAMES: string[] = ["guaiwu1", "guaiwu2", "guaiwu3", "guaiwu4", "guaiwu5", "guaiwu6"];
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStageListener, this);
	}

	private addedToStageListener(): void {

		this.gameCtn = new egret.Sprite();
		this.addChild(this.gameCtn);

		this.mapCtn = new egret.Sprite();
		this.gameCtn.addChild(this.mapCtn);

		this.enemyCtn = new egret.Sprite();
		this.gameCtn.addChild(this.enemyCtn);

		this.gff = new GridFlowField();
		this.gff.calculateGridCount(this.stage.stageWidth * 2, this.stage.stageHeight * 2);
		// this.gff.randomGenerateObstacles(20);
		// this.gff.addObstaclesByArray(this.obstacleArray);
		// this.gff.initGridLines(this.mapCtn);
		// this.gff.initDistanceTexts(this.mapCtn);
		// this.gff.initArrowShapes(this.mapCtn);
		this.gff.initObstacleShapes(this.mapCtn);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
		console.log(this.enemyDataList.length);
		this.am = new AgentManager(this.gff);
		this.addAgentVos();
		this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
	}

	private addAgentVos(): void {
		for (let i: number = 0; i < this.enemyDataList.length; i++) {
			// 随机选择纹理
			const textureIndex: number = Math.floor(Math.random() * this.ENEMY_TEXTURE_NAMES.length);
			const textureName: string = this.ENEMY_TEXTURE_NAMES[textureIndex];
			const texture: egret.Texture | null = RES.getRes(textureName);
			// 使用纹理创建敌人
			let agent: egret.DisplayObject = new egret.Bitmap(texture);
			agent.anchorOffsetX = agent.width * 0.46;
			agent.anchorOffsetY = agent.height * 0.56;
			agent.scaleX = agent.scaleY = .5;
			let r: number = (agent.width > agent.height ? agent.width : agent.height) * agent.scaleY / 2;
			this.enemyCtn.addChild(agent);
			let data: { x: number, y: number, rotation?: number } = this.enemyDataList[i];
			let aVo: AgentVo = this.am.addAgentVo(data.x, data.y, r, data.rotation);
			aVo.userData = agent;
		}
		this.am.update();
	}

	private loop(): void {
		this.am.update();
		this.updateViews();
	}

	/**
	 * 更新agent显示对象
	 */
	private updateViews(): void {
		if (!this.am.agents) return;
		for (let i: number = 0; i < this.am.agents.length; i++) {
			let aVo: AgentVo = this.am.agents[i];
			let agent: egret.DisplayObject = aVo.userData;
			if (!agent) continue;
			agent.x = aVo.x;
			agent.y = aVo.y;
			agent.rotation = aVo.rotation;
		}
	}

	/** 
     * 点击网格设置目标点
     * @param e 触摸事件对象
     */
	private onTouchTap(e: egret.TouchEvent): void {
		this.addAgentVos();
		let pt: egret.Point = this.gameCtn.globalToLocal(e.stageX, e.stageY)
		let gridInfo: { col: number; row: number; } = this.gff.getGridByScreenPos(pt.x, pt.y);
		if (!gridInfo) return;
		this.gff.calculateBFSDistanceField(gridInfo.col, gridInfo.row)
		// this.gff.highlightTarget(gridInfo.col, gridInfo.row, this.mapCtn);
		// this.gff.updateArrowsDir();
		// this.gff.updateDistanceTexts();
	}

}