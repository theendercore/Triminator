import {useEffect, useRef} from "preact/hooks";

export default function Merger({}: { path: string }) {
    return (
        <div className="flex flex-col items-center justify-center gap-2 p-20 pt-5 text-left">
            <h1 class="text-2xl p-6 ">Work in Progress</h1>

            <h2 class="text-xl p-3">Debug stuff pls ignore! 😃</h2>
            <TestingBlock/>
        </ div>
    );

}


function TestingBlock() {
    let image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAgCAYAAACinX6EAAAAAXNSR0IArs4c6QAAA05JREFUaIHdWduR2zAMXOVcgEpACVcCS2EpTAdXAktQCSjBJbAEdcB8RKtAMGnpckps385oLJHgA0+C8FBKqaUU9J4QAgBARJBSgqpCVVFKAQCo6oAXxkVE9hioIgIRQSkFfAewCuGVcdkjsExSCPZ5dfw4SmiZ/Q6ME7sCCCEghLDRvois7a+OXRcgrO/z9ztg1wJUFcCWab6z75WxK4Be1Lftr4whxlgtg2TMapcxgHGAtJ7GxogWTUoJIoIY49pWSnloHjHknKvXZE/jFq0+fzpQAAyapLXHaErpoQJ4m+c5lVIwjiOmacI4jgCAeZ5RSsHHx8e62ff3dwBAzhmqimmaVuZJzzmmaYKqYp5nAMA4jhjHcaVj3/V6/fkQzhcMIYSmCzhTH5b3uqTHAwDYsf6Y5Fj22d/W3I/CxWd03BCZs6bvfdoylHMelrbayh6tUDnmGXDpBSFVHVJK1bZR8wQFQOaBZlCraOBpBHCvk7dBVa2eeVWt3iI6c3Bc7bQ/FHcFkHPunvV0nZzzoYWehWGP3U2JyFNpTlUr8Fs5McYbt/wsDt0FfDR/JM6+jxy+DD0L7rnl3+CQAJ5B8wQzyrMuYkcqQnd9LKVUbRKkqgghbI5GAIgxVlVFjHGTE+ScNzWHZc219kiNM6X28DEq57zGB+D26PY4XBHqgckSn+XYvKGjYCztssGbPttms0ai1Xakr4UvxwC7IPOGRcOVVsAbp0+xSU9GrQWklDZrtMbe29N/F4D9NiWzCtzeAD291bSdw1uSncMKzIJr9VzG41QB8N2as4X9P8GPtfVFKzDGDEvfY57IOa80e4nalwVgC6aE9WlumNr8LL0Pmq3LFQO1iFRPv4eNAEIIlZPbSe5dWa2peZ8m2M7I7ulbN0VDM4hI5cmy3DbXX7sXKwjf18NaEmuZI48g39/65sYJb7rWFFv01mVsrPDH6dm4+IWtRvyRZdv8Ru34ZeObhTjGBjZL7+c6EsDOwIUmyQ1YX2Qktv3WIpbH1wiqLIVP79OlUQEivf+TxQvkX+ENQOIH63W29mc3Mc/zWuMz35ua3lLjSwDWGiB9f5qmG3MmPWuGwB+BtejPxiAulQT6Vd4WesHG1xr3an+fpT8LvwAcukAX5uHdVQAAAA5lWElmTU0AKgAAAAgAAAAAAAAA0lOTAAAAAElFTkSuQmCC"

    let vertexShaderFile = "precision mediump float;\n" +
        "\n" +
        "attribute vec2 vertPosition;\n" +
        "\n" +
        "void main(){\n" +
        "    gl_Position = vec4(vertPosition, 0.0, 1.0);\n" +
        "}"
    let fragShaderFile = "precision mediump float;\n" +
        "\n" +
        "void main(){\n" +
        "    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n" +
        "}"

    function renderStuff(gl: WebGLRenderingContext, time: number) {
        gl.clearColor(0.5, 0.7, 0.5, 1.0)
        // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        let vertShader = gl.createShader(gl.VERTEX_SHADER)!!
        let fragShader = gl.createShader(gl.FRAGMENT_SHADER)!!

        gl.shaderSource(vertShader, vertexShaderFile)
        gl.shaderSource(fragShader, fragShaderFile)

        gl.compileShader(vertShader)
        if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS))
            return console.error("ERROR Vert Shader!", gl.getShaderInfoLog(vertShader))

        gl.compileShader(fragShader)
        if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS))
            return console.error("ERROR Frag Shader!", gl.getShaderInfoLog(fragShader))

        let prog = gl.createProgram()!!
        gl.attachShader(prog, vertShader)
        gl.attachShader(prog, fragShader)
        gl.linkProgram(prog)
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS))
            return console.error("ERROR Link prog", gl.getProgramInfoLog(prog))

        //remove later
        gl.validateProgram(prog)
        if (!gl.getProgramParameter(prog, gl.VALIDATE_STATUS))
            return console.error("ERROR Link prog", gl.getProgramInfoLog(prog))
        //
        let triangle = [
            0.0, 0.5,
            -0.5, 0.5,
            0.5, 0.5
        ]
        let triangleVertBuffObj = gl.createBuffer()!!;
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertBuffObj)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangle), gl.STATIC_DRAW)

        let posLoc = gl.getAttribLocation(prog, 'vertPosition')
        gl.vertexAttribPointer(
            posLoc,
            2,
            gl.FLOAT,
            false,
            2 * Float32Array.BYTES_PER_ELEMENT,
            0
        )

        //Main rendering
        gl.useProgram(prog)
        gl.drawArrays(gl.TRIANGLES, 0, 3)

    }

    return <CustomCanvas draw={renderStuff}/>
}


function CustomCanvas({draw}: { draw: (context: WebGLRenderingContext, time: number) => void }) {
    const ref = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const context = ref.current!!.getContext("webgl")!!
        let time = 0
        let animationId: number;

        function x() {
            time++
            draw(context, time)
            animationId = window.requestAnimationFrame(x)
        }

        x()
        return () => window.cancelAnimationFrame(animationId)
    }, [draw])
    return (
        <>
            <canvas ref={ref} height="500" width="500" class="border-2 border-primary rounded">
                HTML Canvas not supported!
            </canvas>
        </>
    );
}

