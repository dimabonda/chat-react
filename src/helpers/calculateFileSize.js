export function calculateFileSize(size) {
    var i = Math.floor( Math.log(size) / Math.log(1024) );
    
    return (i ? ( size / Math.pow(1024, i) ).toFixed(1) * 1 + ' ' + ['B', 'kB', 'MB', 'GB'][i] : '')
};