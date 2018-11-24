const fs = require('fs')
const path = require('path')
const filePath = path.join('.','types.js')

// change action and entity here. Then drink beer
const action = 'execute'
const entity = 'command'

fs.appendFile(filePath, `\n //${action} ${entity} \n` , (err) => {
    if(err){throw err}
})


const converter = (actionsArray) => {
    return actionsArray.map(x => {
        let p = `export const ${x} = '${x.toLowerCase()}'\n`
        return p 
    })
}

const actionArray = (action,entity) => {
    const a1 = action.toUpperCase() + '_' + entity.toUpperCase() + '_' + 'START'
    const a2 = action.toUpperCase() + '_' + entity.toUpperCase() + '_' + 'SUCCESS'
    const a3 = action.toUpperCase() + '_' + entity.toUpperCase() + '_' + 'FAIL'
    
    return {
        actions : [a1,a2,a3],
        importActions : ` /* \n  ${a1},${a2},${a3}, \n  */ \n`
    }
}

const outOne = actionArray(action, entity)
const output =  converter( outOne.actions )

output.forEach(x => {

    fs.appendFile(filePath, x , (err) => {
        if(err){throw err}
    })
})

setTimeout((imps)=>{
    fs.appendFile(filePath, imps , (err) => {
        if(err){throw err}
    })
    
},100,outOne.importActions)
