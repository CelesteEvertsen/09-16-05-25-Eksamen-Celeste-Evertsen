# 09-16-05-25-Eksamen-Celeste-Evertsen

## Mappe struktur

# Css>
 her ligger styling for datingssite.js

# Js>
 her finner vi alle JS filer, der Index.Js er for registrering av brukere, 
signIn.js er for å logge inn etter bruker har blitt lagert.

datingSite.js, her ligger mer En bare filtrering for kvinner. Bruker informasjon som vises på siden ligger også her som shoWUserInHeader()

datingMale.js og allUser.js her ligger fuknsjonen som visers i browser og som lagrer i localStorage, malePOST/alluserPOST og maleDELETE/alluserDELETE kalles her inne også.

# Request>
Når jeg startet oppgaven, begynte jeg med å lage POST,PUT GET og DELETE. 
videre la jeg inn en beskrivende navn fordi jeg fikke opp bugs "Addeventlistener is null"
Bug dukket opp når jeg prøve å hente Menn å vise det i nettleseren. Da prøvde jeg å legge det inn i en egen GET.js (maleGET.js) å buggen ble borte. Tolket dette som om filene ikke klarte å samarbeide riktig når det var mange GET i en og samme fil. Det er grunnen til at jeg har en GET,POST,DELETE for hver filtrering.

Det positive med dette, er når det dukket opp en bug, så viste jeg med engang hvilken fil/request det gjalt, noe som gjorde det noe lettere å Debugge.

# Test
Tester datingSite.html, datingsite.js og index.js
Grunnen til at det er viktig å også teste dom, om en kode skal blir konstat oppdater gjennom livet til appen. Å en ny utvikler med et uhell sletter ett element fra DOM. Så vil Testing hjelpe deg å finne med engang om elementet fortsatt finnes. Det er en måte å raskere feilsøke på.

Jeg testet også AddEventlistener fordi  jeg fikk opp at den er null. Tenkte at det da var lurt å teste at denne finnes å gjør det som er forventet.
// Kilder jeg brukte for å lage testene:
// https://www.testim.io/blog/dom-testing/
//https://jestjs.io/docs/tutorial-jquery
//https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder
// https://stackoverflow.com/questions/32615713/tobetrue-vs-tobetruthy-vs-tobetrue



# html 
html filene ligger løst

## .gitIgnore
unngå at node_module lastes opp i git.


### Filtrering
Jeg Fikk dessverre ikke til filtrering, Prøvde meg på det, å fikk det ikke til å funke sammen med kjønn.
Det vistes kun en kvinne med x alder, men så gikk det ikke å bla videre. Tørte ikke å fortsette med det, da det var mange deler av oppgaven som ikke var ferdig og korrigert.
Valgte heller å droppe  en filtrering som ikke virker opptimalt.

## BUGS
mine egne skrive feil
formange request i en og sammefil fikk det til å krasje (løst)
counter kan kun brukes med ett av kjønnen av gangen
kunne ikke bruke toBeTrue i testen, men thruthy gikk gjennom.
når jeg ikke brukte Await, fikk jeg promise

## Egenlæring
Scrimba
w3school
Moodle(gokstad)
lært nye teknikker for skriving av object.
