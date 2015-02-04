/**
* The MultiTexture plugin allows you to create a MultiTextureAtlas, which can load multiple textures into video memory at once.
*/
Kiwi.Plugins.MultiTexture = {
  
  name:'MultiTexture',

  version:'1.0.0',

  minimumKiwiVersion:'1.1.0',

  pluginDependencies: [
    
  ]

};
Kiwi.PluginManager.register(Kiwi.Plugins.MultiTexture);

/**
* A MultiTextureAtlas contains several images for use in a single shader pipeline.
*
* To use a MultiTextureAtlas, first load all the images as normal assets, e.g. "this.addImage( 'multiImage1', 'jungle.png' )". Once these are loaded (i.e. after the State.preload() method has finished running, normally in State.create() ), create a MultiTextureAtlas using the following:
*
*     var multiTextureAtlas = new Kiwi.Textures.MultiTextureAtlas("MultiTextureAtlas", Kiwi.Textures.MultiTextureAtlas.SINGLE_IMAGE, this.textures.multiImage1.cells, [myState.textures.multiImage1.image, this.textures.multiImage2.image], null);
*     this.textureLibrary.add( multiTextureAtlas );
* 
* It is vital that you add the multitexture atlas to the state library.
*
* Assign the atlas to objects as follows:
*
*     this.entity.atlas = multiTextureAtlas;
*
* You will need to create the objects conventionally first.
*
* The MultiTextureAtlas will upload its images into consecutive texture units for the use of other renderers and shaders. For example, if you have 3 images, it will upload to TEXTURE0, TEXTURE1, and TEXTURE2. You will be able to access these through these numbers, e.g. "gl.uniform1i(this.shaderPair.uniforms.uSampler.location, 2)" to set a sampler in a shader to use the third texture.
*
* You should not attempt to reassign the images after the atlas is created.
*
* MultiTextureAtlas operates exactly like a normal TextureAtlas when necessary. It uses images[0] as its base image. For example, in Canvas rendering mode when shaders are unavailable, it will always display images[0].
*
* @class MultiTextureAtlas
* @namespace Kiwi.Textures
* @constructor
* @param name {string} Name of the texture atlas. This is usually defined by the developer when loading the assets.
* @param type {number} The type of texture atlas that this is. There are currently only three types.
* @param cells {any} The cells that are within this image.
* @param images {Array} One or more HTML Canvas or Image elements. These are assumed to be identical in dimension and cell contents. Maximum texture count is 32; additional textures will not be retained.
* @param [sequences] {Sequence[]} Any sequences of cells for this texture atlas. Used for animation.
* @return {Kiwi.MultiTextureAtlas}
*/


Kiwi.Textures.MultiTextureAtlas = function( name, type, cells, images, sequences ) {
    // Preprocess images array
    // WebGL has a maximum of 32 texture units, so extra images are discarded
    this.images = [];
    for( var i = 0;  i < Math.min(32, images.length);  i++ ) {
        this.images.push( images[i] );
    }
    var image = images[0];  // Create a default texture: this is passed to the super call

    // Perform super functionality
    Kiwi.Textures.TextureAtlas.call( this, name, type, cells, image, sequences );
}
Kiwi.extend( Kiwi.Textures.MultiTextureAtlas, Kiwi.Textures.TextureAtlas );


// Extend functionality

Kiwi.Textures.MultiTextureAtlas.prototype.objType = function () {
    return "MultiTextureAtlas";
};

Kiwi.Textures.MultiTextureAtlas.prototype.createGLTextureWrapper = function( gl, textureManager ) {
    // Super call: create default wrapper
    Kiwi.Textures.TextureAtlas.prototype.createGLTextureWrapper.call( this, gl, textureManager);

    // Create additional wrappers, add to a list, and assign them correct values
    this.glTextureWrappers = [this.glTextureWrapper];
    for( var i = 1;  i < this.images.length;  i++ ) {
        var wrapper = new Kiwi.Renderers.GLTextureWrapper(gl, this);
        wrapper.image = this.images[i];
        this.glTextureWrappers.push( wrapper );
        textureManager.registerTextureWrapper( gl, wrapper );
    }
}

Kiwi.Textures.MultiTextureAtlas.prototype.enableGL = function( gl, renderer, textureManager ) {
    // This function replaces the template version, so it doesn't call super
    // We have copied some functionality from TextureAtlas

    // Set resolution uniforms
    renderer.updateTextureSize(gl, new Float32Array([this.image.width, this.image.height]));
    // Upload texture
    // This ensures that all necessary texture units are in use
    for( var i = 0;  i < this.glTextureWrappers.length;  i++ ) {
        textureManager.useTexture(gl, this.glTextureWrappers[i], i);
    }
    // If necessary, refresh the texture
    if(this.dirty)
        this.refreshTextureGL( gl );
}

Kiwi.Textures.MultiTextureAtlas.prototype.refreshTextureGL = function ( gl ) {
    // Super call: refresh default wrapper
    Kiwi.Textures.TextureAtlas.prototype.refreshTextureGL( this, gl );

    // Refresh additional wrappers
    for( var i = 1;  i < this.glTextureWrappers.length;  i++ ) {
        if(this.glTextureWrappers[i])
            this.glTextureWrappers[i].refreshTexture( gl );
    }
}
