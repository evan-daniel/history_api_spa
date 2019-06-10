export const makeProgram = function(webGL, vertexShaderSource, fragmentShaderSource) {
    
    // Shader program: init
    const shaderProgram = webGL.createProgram(); 
    
    const makeShader = function(type, source) {
        const shader = webGL.createShader(type); 
        webGL.shaderSource(shader, source); 
        webGL.compileShader(shader); 
        webGL.attachShader(shaderProgram, shader); 
        if(!webGL.getShaderParameter(shader, webGL.COMPILE_STATUS)) {
            throw `Could not shader (${type}): ` + webGL.getShaderInfoLog(shader); 
        }
        return shader; 
    }; 
    makeShader(webGL.VERTEX_SHADER, vertexShaderSource); 
    makeShader(webGL.FRAGMENT_SHADER, fragmentShaderSource); 

    // Shader program: link, use, return
    webGL.linkProgram(shaderProgram); 
    return shaderProgram; 
}; 

export const clipspaceTuplePoint = function(webGl, x, y) {
    return [2 * x * window.devicePixelRatio / webGl.canvas.width - 1, -2 * y * window.devicePixelRatio / webGl.canvas.width + 1]; 
}; 

export const sizeCanvas = function(canvas) {
    const side = Math.floor((canvas.clientWidth) * window.devicePixelRatio); 
    if(canvas.width !== side || canvas.height !== side) canvas.width = canvas.height = side; 
}; 

export const m3Multiply = function(a, b) {
    return [
        a[0] * b[0] + a[3] * b[1] + a[6] * b[2], 
        a[1] * b[0] + a[4] * b[1] + a[7] * b[2], 
        a[2] * b[0] + a[5] * b[1] + a[8] * b[2], 
        a[0] * b[3] + a[3] * b[4] + a[6] * b[5], 
        a[1] * b[3] + a[4] * b[4] + a[7] * b[5], 
        a[2] * b[3] + a[5] * b[4] + a[8] * b[5], 
        a[0] * b[6] + a[3] * b[7] + a[6] * b[8], 
        a[1] * b[6] + a[4] * b[7] + a[7] * b[8], 
        a[2] * b[6] + a[5] * b[7] + a[8] * b[8], 
    ]; 
}; 

export const Multiply = function(a, b) {
    return [
        b[0] * a[0] + b[1] * a[4] + b[2] * a[8] + b[3] * a[12],
        b[0] * a[1] + b[1] * a[5] + b[2] * a[9] + b[3] * a[13],
        b[0] * a[2] + b[1] * a[6] + b[2] * a[10] + b[3] * a[14],
        b[0] * a[3] + b[1] * a[7] + b[2] * a[11] + b[3] * a[15],
        b[4] * a[0] + b[5] * a[4] + b[6] * a[8] + b[7] * a[12],
        b[4] * a[1] + b[5] * a[5] + b[6] * a[9] + b[7] * a[13],
        b[4] * a[2] + b[5] * a[6] + b[6] * a[10] + b[7] * a[14],
        b[4] * a[3] + b[5] * a[7] + b[6] * a[11] + b[7] * a[15],
        b[8] * a[0] + b[9] * a[4] + b[10] * a[8] + b[11] * a[12],
        b[8] * a[1] + b[9] * a[5] + b[10] * a[9] + b[11] * a[13],
        b[8] * a[2] + b[9] * a[6] + b[10] * a[10] + b[11] * a[14],
        b[8] * a[3] + b[9] * a[7] + b[10] * a[11] + b[11] * a[15],
        b[12] * a[0] + b[13] * a[4] + b[14] * a[8] + b[15] * a[12],
        b[12] * a[1] + b[13] * a[5] + b[14] * a[9] + b[15] * a[13],
        b[12] * a[2] + b[13] * a[6] + b[14] * a[10] + b[15] * a[14],
        b[12] * a[3] + b[13] * a[7] + b[14] * a[11] + b[15] * a[15],
    ]; 
}; 

export const M4 = {
    Multiply: Multiply, 

    RotateX: (transform, angle) => Multiply(
        transform, 
        [
            1, 0, 0, 0, 
            0, Math.cos(angle * Math.PI), Math.sin(angle * Math.PI), 0, 
            0, Math.sin(angle * -Math.PI), Math.cos(angle * Math.PI), 0, 
            0, 0, 0, 1, 
        ]
    ), 

    RotateY: (transform, angle) => Multiply(
        transform, 
        [
            Math.cos(angle * Math.PI), 0, Math.sin(angle * Math.PI), 0, 
            0, 1, 0, 0, 
            Math.sin(angle * -Math.PI), 0, Math.cos(angle * Math.PI), 0, 
            0, 0, 0, 1, 
        ]
    ), 

    RotateZ: (transform, angle) => Multiply(
        transform, 
        [
            Math.cos(angle * Math.PI), Math.sin(angle * Math.PI), 0, 0, 
            -1 * Math.sin(angle * Math.PI), Math.cos(angle * Math.PI), 0, 0, 
            0, 0, 1, 0, 
            0, 0, 0, 1, 
        ]
    ), 
}