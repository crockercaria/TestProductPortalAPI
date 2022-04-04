const PPPROD = {
    'protocol':'https',
    'host':'glass.epos.ubi.pt:8080',
    'gf':'/GlassFramework/webresources'
}
const PPDEVext = {
    'protocol':'https',
    'host':'glass.epos.ubi.pt:8083',
    'gf':'/GlassFramework/webresources'
}
const PPDEVint = {
    'protocol':'http',
    'host':'10.0.7.65:8083',
    'gf':'/GlassFramework/webresources'
}
const localhost = {
    'protocol':'http',
    'host':'glass.epos.ubi.pt:8080',
    'gf':'/GlassFramework/webresources'
}
const env={ 'PPPROD':PPPROD,
            'PPDEVext':PPDEVext,
            'PPDEVint':PPDEVint,
            'localhost': localhost };

module.exports = { env };