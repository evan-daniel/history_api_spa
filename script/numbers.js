import * as webGLFunction from '/script/webGLFunction.js'; 

export const init = () => {
    const canvas = document.querySelector('.numbers canvas'); 
    const webGL = canvas.getContext('webgl'); 
    const resizeCanvas = (() => webGL.canvas.width = webGL.canvas.height = Math.min(window.innerWidth,window.innerHeight))(); 
    // window.addEventListener('resize', resizeCanvas); 

    const twoProgram = webGLFunction.makeProgram(webGL, `
            attribute vec2 a_position; 

            uniform mat3 u_translate; 
            uniform mat3 u_scale; 
            uniform mat3 u_rotate; 

            void main(void) {
                gl_Position = vec4(vec2(u_scale * u_translate * vec3(a_position, 1)), 0, 1); 
            }
        `, `
            precision mediump float; 

            void main(void) {
                gl_FragColor = vec4(1.0, 0, 1.0, 1.0); 
            }
    `); 

    
    class TwoShape {
        constructor(program, position, translate, scale, rotate) {
            this.program = program; 
            this.positionLocation = webGL.getAttribLocation(this.program, 'a_position'); 
            this.translateLocation = webGL.getUniformLocation(this.program, 'u_translate'); 
            this.scaleLocation = webGL.getUniformLocation(this.program, 'u_scale'); 
            this.rotateLocation = webGL.getUniformLocation(this.program, 'u_rotate'); 
            
            this.position = position; 
            this.translate = translate; 
            this.scale = scale; 
            this.rotate = rotate; 
            this.positionBuffer = webGL.createBuffer(); 
        }
        
        render() {
            webGL.useProgram(this.program); 
            webGL.bindBuffer(webGL.ARRAY_BUFFER, this.positionBuffer); 
            webGL.bufferData(webGL.ARRAY_BUFFER, new Float32Array(this.position), webGL.STATIC_DRAW); 
            webGL.enableVertexAttribArray(this.positionLocation); 
            webGL.vertexAttribPointer(this.positionLocation, 2, webGL.FLOAT, false, 0, 0); 

            webGL.uniformMatrix3fv(this.translateLocation, false, [1, 0, 0, 0, 1, 0, -0.5, 0, 1]); 
            webGL.uniformMatrix3fv(this.scaleLocation, false, [0.5, 0, 0, 0, 0.5, 0, 0, 0, 1]); 
            webGL.uniformMatrix3fv(this.rotateLocation, false, [1, 0, 0, 0, 1, 0, 0, 0, 1]); 
            
            webGL.drawArrays(webGL.TRIANGLES, 0, 3); 
        }
    }
    const testShape = new TwoShape(twoProgram, [0, 0, 0, 1, 1, 0]); 

    (function render() {
        webGL.clearColor(1, 1, 1, 1); 
        webGL.clear(webGL.COLOR_BUFFER_BIT); 
        webGL.viewport(0, 0, webGL.canvas.width, webGL.canvas.height); 

        testShape.render(); 

        requestAnimationFrame(render); 
    })(); 
}; 