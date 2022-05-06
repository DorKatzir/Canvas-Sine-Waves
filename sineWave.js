
function initCanvas() {
    let ctx = document.getElementById('my_canvas').getContext('2d')
    let cW = ctx.canvas.width,
    cH = ctx.canvas.height
    
    const gui = new dat.GUI()
    const wave = { 
                    y: cH/2, 
                    length: 0.01, 
                    amplitude: 100,
                    frequency: 0.04
                }
    const strokeColor = { 
                    h: 200,
                    s: 100,
                    l: 50
                }
    const fillColor = { 
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 0.1
                }

    const waveFolder = gui.addFolder('wave')
    waveFolder.add(wave, 'y', 0, cH)
    waveFolder.add(wave, 'length', -0.01, 0.01)
    waveFolder.add(wave, 'amplitude', -500, 500)
    waveFolder.add(wave, 'frequency', -0.01, 1)
    waveFolder.open()

    const strokeFolder = gui.addFolder('strokeColor')
    strokeFolder.add(strokeColor, 'h', 0, 255 )
    strokeFolder.add(strokeColor, 's', 0, 100 )
    strokeFolder.add(strokeColor, 'l', 0, 100 )
    strokeFolder.open()
    
    const fillFolder = gui.addFolder('fillColor')
    fillFolder.add(fillColor, 'r', 0, 255 )
    fillFolder.add(fillColor, 'g', 0, 255 )
    fillFolder.add(fillColor, 'b', 0, 255 )
    fillFolder.add(fillColor, 'a', 0, 1 )
    fillFolder.open()

    let increment = wave.frequency
    function animate() {
        requestAnimationFrame(animate, 5)
        //ctx.save()
        //ctx.fillStyle = '#2b2b2b'
        ctx.setLineDash([2, 2, 2, 2, 2])
        //ctx.lineDashOffset = 30
        //ctx.getLineDash()
        ctx.fillStyle = `rgba(${fillColor.r},${fillColor.g},${fillColor.b},${fillColor.a})`
        ctx.fillRect(0, 0, cW, cH)
        // Draw Here
        ctx.beginPath()
        ctx.moveTo(0, cH / 2)
        for (let i = 0; i < cW; i++) {
            ctx.lineTo(
                i,
                wave.y +
                    Math.sin(i * wave.length + increment) *
                        wave.amplitude *
                        Math.sin(increment * 2)
            )
        }
        ctx.strokeStyle = `hsl(${Math.abs(
            strokeColor.h * Math.sin(increment)
        )},${strokeColor.s}%,${strokeColor.l}%)`
        ctx.stroke()
        increment += wave.frequency
        //console.log('animate...')
        //ctx.restore()
    }
    animate()
}

window.addEventListener('load', function (event) {
    initCanvas()
})
