const fs = require('fs');

const sampleRate = 44100,
      resolution = 16;

const maxLevel = Math.pow(2, resolution - 1) - 1,
      BinaryArray = {
          8: Int8Array,
          16: Int16Array,
          32: Int32Array
      }[resolution];

function sineWave(frequency, duration) {
    var samplesCount = Math.floor(duration * sampleRate),
        array = new BinaryArray(samplesCount);
    
    for (var sampleNumber = 0; sampleNumber < samplesCount; sampleNumber++) {
        var currentTime = sampleNumber / sampleRate,
            signal = Math.sin(2 * Math.PI * frequency * currentTime),
            level = Math.floor(signal * maxLevel);
        array[sampleNumber] = level;
    }
    
    return array;
}

function writePCM(filename, frequency, duration) {
    var array = sineWave(frequency, duration),
        buffer = new Buffer(array.buffer);
    fs.writeFile(filename, buffer, 'binary');
}

writePCM('440hz.pcm', 440, 10);