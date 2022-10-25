precision mediump float;

uniform vec2 u_blocks;
uniform vec2 u_resolution;
uniform vec2 u_textureResolution;
uniform sampler2D u_texture;
uniform sampler2D u_texture_modifications;

uniform vec2 u_mouse;
uniform vec2 u_customBlock;

varying vec2 v_texcoord;

vec2 getAspectRatio(vec2 uv, float canvas_ratio, float texture_ratio) {
    //stretch the image as needed
    if(texture_ratio > canvas_ratio) {
        //image is wider than canvas
        float ratio_diff = canvas_ratio / texture_ratio;
        uv.x *= ratio_diff;
        uv.x += (1.0 - ratio_diff) / 2.0;
    } else {
        float ratio_diff = texture_ratio / canvas_ratio;
        uv.x *= ratio_diff;
        uv.x += (1.0 - ratio_diff) / 2.0;
    }
    return uv;
}

void main(void) {
    vec2 uv = v_texcoord;

    //get aspect ratios
    float canvas_ratio = u_resolution.x / u_resolution.y;
    float texture_ratio = u_textureResolution.x / u_textureResolution.y;
    uv = getAspectRatio(uv, canvas_ratio, texture_ratio);

    vec2 blocks = u_blocks;

    //sample by block from closest fragment
    vec2 block = floor(uv * blocks) / blocks;

    // sample color
    vec4 textureColor = texture2D(u_texture, block);
    vec4 color = textureColor;
    // if( effectCoordinates > 0.0){

    // }

    gl_FragColor = color;
}