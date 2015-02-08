/**
* A Object that outlines the information related to this Repeating Texture Plugin. Aka the name and version of it. 
* 
* @module Kiwi
* @submodule Plugins
* @namespace Kiwi.Plugins
* @class RepeatingTexture
*/
Kiwi.Plugins.RepeatingTexture = {
    /**
    * The name of this plugin.
    * @property name
    * @default 'RepeatingTexture'
    * @public
    */
	name: 'RepeatingTexture',
    /**
    * The version of this plugin.
    * @property version
    * @default '1.0.0'
    */
	version: '1.0.0'
}
	
Kiwi.PluginManager.register(Kiwi.Plugins.RepeatingTexture);


//Do Kiwi Plugin GameObjects Exist?
if( typeof Kiwi.Plugins.GameObjects == "undefined") {
    Kiwi.Plugins.GameObjects = {}; 
}


/**
* 
* @class RepeatingTexture
* @extends Entity
* @namespace Kiwi.Plugins.GameObjects
* @constructor
* @param state {State} The State that this gameobject belongs to.
* @param atlas {TextureAtlas|SpriteSheet} The spritesheet or textureatlas that holds the font.
* @param [x=0] {Number} The gameobjects coordinates on the x-axis.
* @param [y=0] {Number} The gameobjects coordinates on the y-axis.
* @param [width] {Number} How wide of an area the Object should cover. Note: Does not take affect if locked to a camera. If not passed will be as wide as the first cell in the TextureAtlas.
* @param [height] {Number} How high of an area the Object should cover. Note: Does not take affect if locked to a camera. If not passed will be as wide as the first cell in the TextureAtlas.
*/
Kiwi.Plugins.GameObjects.RepeatingTexture = function(state, atlas, x, y, width, height) {

    //Call the parent.
    Kiwi.Entity.call(this, state, x, y); 

    /**
    * The texture atlas holds the image that will be used for rendering.
    * @property atlas
    * @type TextureAtlas
    * @public
    */
    this.atlas = atlas;

    /**
    * The camera that the repeating background should be 'locked' to. This is an INTERNAL property, use the 'camera' getters/setters for actual implementation 
    * @property _camera
    * @type Camera
    * @private
    */
    this._camera = null;

    /**
    * Indicates whether or not this GameObject is currently 'locked' onto a camera or not. This property is READ ONLY.
    * @property lockedToCamera
    * @type Boolean
    * @default false
    * @public
    */
    this.lockedToCamera = false;

    /**
    * Whether the graphic should be rendered in repetition on the X axis.
    * @property repeatX
    * @type Boolean
    * @default true
    * @public
    */
    this.repeatX = true;

    /**
    * Whether the graphic should be rendered in repetition on the y axis.
    * @property repeatY
    * @type Boolean
    * @default true
    * @public
    */
    this.repeatY = true;

    /**
    * The Offset, is a how far away from the regular x/y coordinates the rendering should take place. 
    * This work regardless of if it is locked to a camera or not.
    * @property _offset
    * @type Point
    * @private
    */
    this._offset = new Kiwi.Geom.Point(0, 0);

    /**
    * The cell offset is how far away the first image (when rendering) should be away from the top/left coordinate (normal x/y + offset x/y).
    * See the paralax/stars examples for more information. 
    * @property _cellOffset
    * @type Point
    * @private
    */
    this._cellOffset = new Kiwi.Geom.Point(0, 0);


    //Was the width set? 
    if(typeof width == "undefined") {
        this._width = this.atlas.cells[this.cellIndex].w;
    } else {
        this._width = width;
    }

    //Was the height set?
    if(typeof height == "undefined") {
        this._height = this.atlas.cells[this.cellIndex].h;
    } else {
        this._height = height;
    }

    //If rendering in webgl then use the TextureAtlasRenderer
    if( this.game.renderOption === Kiwi.RENDERER_WEBGL) {
        this.glRenderer = this.game.renderer.requestSharedRenderer("TextureAtlasRenderer");
    } 

}

//End it from a Entity
Kiwi.extend(Kiwi.Plugins.GameObjects.RepeatingTexture, Kiwi.Entity);


/**
* The type of object this is.
* @method objType
* @type String
* @public
* @default 'RepeatingTexture'
*/
Kiwi.Plugins.GameObjects.RepeatingTexture.prototype.objType = function() {
    return 'RepeatingTexture';
}


/**
* The camera that the repeating background is 'locked' to.
* If you are wanting to remove the object from being 'locked' to the camera then set this to 'null' or 'false'.
* @property camera
* @type Camera
* @public
*/
Object.defineProperty(Kiwi.Plugins.GameObjects.RepeatingTexture.prototype, "camera", {
    get: function() {
        if(this.lockedToCamera) {
            return this._camera;
        } else {
            return null;
        }
    },
    set: function(val) {
        if(val == null || val == false) {
            this.lockedToCamera = false;
            this._camera = null;
        } else {
            this.lockedToCamera = true;
            this.x = 0;
            this.y = 0;
            this._camera = val;  
        }
    },
    enumerable: true,
    configurable: true
});


/**
* How wide of an area the Object should cover. 
* Note: If locked to a camera, then the width rendered will be that of the camera this is locked to. 
* You can still set the width if should take up afterwards if you want though.
* @property width
* @type number
* @public
*/
Object.defineProperty(Kiwi.Plugins.GameObjects.RepeatingTexture.prototype, "width", {
    get: function() {
        if(this.repeatX == false) return this.atlas.cells[this.cellIndex].w;

        if(this.lockedToCamera) {
            return this._camera.width;
        } else {
            return this._width;
        }

    },
    set: function(val) {
        this._width = val;
    },
    enumerable: true,
    configurable: true
});



/**
* How high of an area the Object should cover. 
* Note: If locked to a camera, then the height rendered will be that of the camera this is locked to. 
* You can still set the height if should take up afterwards if you want though.
* @property height
* @type number
* @public
*/
Object.defineProperty(Kiwi.Plugins.GameObjects.RepeatingTexture.prototype, "height", {
    get: function() {
        if(this.repeatY == false) return this.atlas.cells[this.cellIndex].h;

        if(this.lockedToCamera) {
            return this._camera.height;
        } else {
            return this._height;
        }

    },
    set: function(val) {
        this._height = val;
    },
    enumerable: true,
    configurable: true
});



/**
* The cell offset X is how far away the first image (when rendering) should be away from the left coordinate (normal x + offset x).
* The cell offset X is how far away the first image (when rendering) should be away from the left coordinate (normal x + offset x).
* See the paralax/stars examples for more information. 
* @property cellOffsetX
* @type number
* @public
*/
Object.defineProperty(Kiwi.Plugins.GameObjects.RepeatingTexture.prototype, "cellOffsetX", {
    get: function() {
        return this._cellOffset.x;
    },
    set: function(val) {        
        this._cellOffset.x = Kiwi.Utils.GameMath.wrap(val, this.atlas.cells[this.cellIndex].w, 1);
    },
    enumerable: true,
    configurable: true
});



/**
* The cell offset Y is how far away the first image (when rendering) should be away from the left coordinate (normal y + offset y).
* See the paralax/stars examples for more information. 
* @property cellOffsetY
* @type number
* @public
*/
Object.defineProperty(Kiwi.Plugins.GameObjects.RepeatingTexture.prototype, "cellOffsetY", {
    get: function() {
        return this._cellOffset.y;
    },
    set: function(val) {
        this._cellOffset.y = Kiwi.Utils.GameMath.wrap(val, this.atlas.cells[this.cellIndex].h, 0);
    },
    enumerable: true,
    configurable: true
});



/**
* The Offset, is a how far away from the regular x coordinates the rendering should take place. 
* This will work regardless of if it is locked to a camera or not.
* @property offsetX
* @type Number
* @public
*/
Object.defineProperty(Kiwi.Plugins.GameObjects.RepeatingTexture.prototype, "offsetX", {
    get: function() {
        return this._offset.x;
    },
    set: function(val) {
        this._offset.x = val;
    },
    enumerable: true,
    configurable: true
});



/**
* The Offset, is a how far away from the regular y coordinates the rendering should take place. 
* This will work regardless of if it is locked to a camera or not.
* @property offsetY
* @type Number
* @private
*/
Object.defineProperty(Kiwi.Plugins.GameObjects.RepeatingTexture.prototype, "offsetY", {
    get: function() {
        return this._offset.y;
    },
    set: function(val) {
        this._offset.y = val;
    },
    enumerable: true,
    configurable: true
});



/**
* The update loop that is executed every frame.
* @method update
* @public
*/
Kiwi.Plugins.GameObjects.RepeatingTexture.prototype.update = function() {

    //Update
    Kiwi.Entity.prototype.update.call(this);

    if(this.lockedToCamera) {
        this.x = 0 - this.camera.transform.x;
        this.y = 0 - this.camera.transform.y;
    }

}


/**
* The method that controls how this object is rendered when using the CANVAS renderer. 
* @method render
* @public
*/
Kiwi.Plugins.GameObjects.RepeatingTexture.prototype.render = function(camera) {

    if(this.visible == true && this.alpha > 0) {

        var ctx = this.game.stage.ctx;
        ctx.save();

        if (this.alpha > 0 && this.alpha <= 1) {
            ctx.globalAlpha = this.alpha;
        }

        // get entity/view matrix
        var t = this.transform;
        var m = t.getConcatenatedMatrix();

        var ct = camera.transform;

        // ctx.setTransform(m.a, m.b, m.c, m.d, m.tx + t.rotPointX, m.ty + t.rotPointY);
        ctx.transform(m.a, m.b, m.c, m.d, m.tx + t.rotPointX, m.ty + t.rotPointY);

        this.calculateCoordinates();
        // this.patternCanvas 

        
        for(var i = 0; i < this._renderCoords.length; i += 8) {

            //Loop through them...
            ctx.drawImage(this.atlas.image, 
                this._renderCoords[i], 
                this._renderCoords[i + 1], 
                this._renderCoords[i + 2], 
                this._renderCoords[i + 3], 
                this._renderCoords[i + 4] - t.rotPointX, 
                this._renderCoords[i + 5] - t.rotPointY, 
                this._renderCoords[i + 6], 
                this._renderCoords[i + 7]);
        
        }
        

        ctx.restore();

    }   

}


/**
* This method is used across renderers to calculate the coordinates for all of the points on the ap
*
* @method calculateCoordinates
* @private
*/
Kiwi.Plugins.GameObjects.RepeatingTexture.prototype.calculateCoordinates = function() {

        this._renderCoords = [];

        var cell = this.atlas.cells[this.cellIndex];

        var w = cell.w;
        var h = cell.h;

        var cellX = cell.x;
        var cellY = cell.y;

        for(var x = 0; x < this.width; x += w) {
            
            if(x + cell.w > this.width) {
                w = cell.w - ((x + cell.w) - this.width);
            } else {
                w = cell.w;
            }

            if(this._cellOffset.x !== 0 && x === 0) {

                w = cell.w - this._cellOffset.x; 

                cellX = cell.x + ( cell.w - w );

                if(x + w > this.width) {
                    w = this.width - x;
                }

            } else {
                cellX = cell.x;

            }

            for(var y = 0; y < this.height; y += h) {


                if(y + cell.h > this.height) {
                    h = cell.h - ((y + cell.h) - this.height);
                } else {
                    h = cell.h;
                }

                if(this._cellOffset.y !== 0 && y === 0) {

                    h = cell.h - this._cellOffset.y; 

                    cellY = cell.y + ( cell.h - h );

                    if(y + h > this.height) {
                        h = this.height - y;
                    }

                } else {
                    cellY = cell.y;

                }


                this._renderCoords.push(cellX, cellY, w, h, x + this.offsetX, y + this.offsetY, w, h);

            }
        }
}


/**
* Controls the rendering of this gameobject on WebGL.
* @method renderGL
* @public
*/
Kiwi.Plugins.GameObjects.RepeatingTexture.prototype.renderGL = function(gl, camera, params) {

    if(this.visible == false) return; 

    // Set-up the xyuv and alpha
    var vertexBuffer= [];

    // Width/Height
    var w = 0;
    var h = 0;

    // Transform/Matrix
    var t = this.transform;
    var m = t.getConcatenatedMatrix();

    // Create the Point Objects.
    var pt1 = new Kiwi.Geom.Point(0 - t.rotPointX , 0 - t.rotPointY);
    var pt2 = new Kiwi.Geom.Point(0 - t.rotPointX , 0 - t.rotPointY);
    var pt3 = new Kiwi.Geom.Point(0 - t.rotPointX , 0 - t.rotPointY);
    var pt4 = new Kiwi.Geom.Point(0 - t.rotPointX , 0 - t.rotPointY);


    // Add on the matrix to the points
    pt1 = m.transformPoint(pt1);
    pt2 = m.transformPoint(pt2);
    pt3 = m.transformPoint(pt3);
    pt4 = m.transformPoint(pt4);


    var cell = this.atlas.cells[this.cellIndex];


    this.calculateCoordinates();

    for(var i = 0; i < this._renderCoords.length; i += 8) {

        vertexBuffer.push(
            pt1.x + t.rotPointX + this._renderCoords[i + 4], pt1.y + t.rotPointY + this._renderCoords[i + 5],         this._renderCoords[i], this._renderCoords[i+1], this.alpha,                     //Top Left Point
            pt2.x + t.rotPointX + this._renderCoords[i + 4] + this._renderCoords[i+6], pt2.y + t.rotPointY + this._renderCoords[i + 5],     this._renderCoords[i] + this._renderCoords[i+2], this._renderCoords[i+1], this.alpha,                  //Top Right Point
            pt3.x + t.rotPointX + this._renderCoords[i + 4] + this._renderCoords[i+6], pt3.y + t.rotPointY + this._renderCoords[i + 5] + this._renderCoords[i+7], this._renderCoords[i] + this._renderCoords[i+2], this._renderCoords[i+1] + this._renderCoords[i+3], this.alpha,              //Bottom Right Point
            pt4.x + t.rotPointX + this._renderCoords[i + 4], pt4.y + t.rotPointY + this._renderCoords[i + 5] + this._renderCoords[i+7],     this._renderCoords[i], this._renderCoords[i+1] + this._renderCoords[i+3],  this.alpha                //Bottom Left Point
        );
        
    }


    // Add to the batch!
    this.glRenderer.concatBatch(vertexBuffer);

}