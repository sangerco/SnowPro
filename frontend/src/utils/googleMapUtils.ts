import { GOOGLE_MAP_API } from '../../../backend/src/vault/secret';

export const loadMapApi = () => {
    const mapsUrl = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API}&libraries=places&v=weekly`;
    const scripts = document.getElementsByTagName('script');

    for(let i = 0; i < scripts.length; i++) {
        if(scripts[i].src.indexOf(mapsUrl) === 0) {
            return scripts[i];
        }
    }

    const googleMapScript = document.createElement( 'script' );
    googleMapScript.src = mapsUrl;
    googleMapScript.async = true;
    googleMapScript.defer = true;
    window.document.body.appendChild(googleMapScript);

    return googleMapScript;
}