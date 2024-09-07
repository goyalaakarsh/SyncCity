import Sendbird from 'sendbird'
let sb = null;

export const getSendbirdObject = () => {
    if (sb == null)
    {
        sb = new Sendbird({ appId: '8FB5D264-B981-4E57-8B58-61FFC8937342' });
    }

    return sb
}