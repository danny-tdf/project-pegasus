var licenseKey = null;
var userName = null;
var scriptCollection = null;

function updateScriptCollection() {
    let scriptSelect = document.getElementById("scriptSelect");
    // remove all scripts from the selection
    for (let i = scriptSelect.options.length - 1; i >= 0; i--) {
        scriptSelect.remove(i);
    }

    // if key or name not set -> error + return
    if (!userName || !licenseKey) return;

    fetch("https://fantasy.cat/api.php?" + new URLSearchParams({
            key: licenseKey,
            software: "constellation",
            cmd: "getAllScripts"
        }))
        .then(response => {
            response.json()
                .then(json => {
                    scriptCollection = json

                    fetch("https://fantasy.cat/api.php?" + new URLSearchParams({
                            key: licenseKey,
                            software: "constellation",
                            cmd: "getScriptUsage"
                        }))
                        .then(response => {
                            response.json()
                                .then(json => {
                                    let usageStats = json

                                    let userMessage = document.getElementById(
                                        "userMessage");
                                    userMessage.innerHTML +=
                                        "<br />you're the creator of the following scripts:";
                                    let foundScript = false;
                                    scriptCollection.forEach(script => {
                                        let option = document.createElement(
                                            "option")
                                        option.text = script.name
                                        scriptSelect.add(option)
                                        if (script.author == userName) {
                                            let foundUsage;
                                            usageStats.forEach(
                                                authorScript => {
                                                    if (script.name ==
                                                        authorScript
                                                        .script)
                                                        foundUsage =
                                                        authorScript
                                                        .count
                                                })

                                            userMessage.innerHTML +=
                                                foundUsage ?
                                                `<br />${script.name} (${foundUsage} users)` :
                                                `<br />${script.name}`;
                                            foundScript = true;
                                        }
                                    });
                                    if (!foundScript) {
                                        userMessage.innerHTML += "<br />-";
                                    }
                                })
                                .catch(err => console.error(err))
                        })
                        .catch(err => console.error(err))
                })
                .catch(err => console.error(err))
        })
        .catch(err => console.error(err))
}

function showScript() {
    if (!licenseKey) {
        document.getElementById("scriptSelectError").innerHTML =
            "You need to set your license key first!";
        return;
    }
    if (!scriptCollection) {
        document.getElementById("scriptSelectError").innerHTML = "Can't get any scripts!";
        return;
    }
    document.getElementById("scriptSelectError").innerHTML = "";

    let selected = document.getElementById("scriptSelect");
    let selectedScriptName = selected.options[selected.selectedIndex].text;

    scriptCollection.forEach(script => {
        if (script.name == selectedScriptName) {
            document.getElementById("scriptArea").value = script.script
            return;
        }
    });
}

function setLicenseKey() {
    let key = document.getElementById("licenseKey").value
    if (!key) {
        console.log("license key is not set!");
        document.getElementById("licenseKeyError").innerHTML =
            "Please enter your license key first!";
        return;
    } else {
        let regex = key.match(/([A-Z0-9]{4}-){3}[A-Z0-9]{4}/);
        if (!regex) {
            document.getElementById("licenseKeyError").innerHTML =
                "That's not a valid license key!";
            return;
        } else {
            document.getElementById("licenseKeyError").innerHTML = "";
            licenseKey = regex[0];

            fetch("https://fantasy.cat/api.php?" + new URLSearchParams({
                    key: licenseKey,
                    software: "constellation",
                    cmd: "getMember",
                    member: licenseKey
                }))
                .then(response => {
                    response.json()
                        .then(json => {
                            userName = json.name
                            document.getElementById("userMessage").innerHTML =
                                `hello ${userName}<br />`;
                            updateScriptCollection()
                        })
                        .catch(err => {
                            console.error(err);
                            document.getElementById("licenseKeyError").innerHTML =
                                "Something went wrong. Please check the browser console";
                            return;
                        })
                })
                .catch(err => {
                    console.error(err);
                    document.getElementById("licenseKeyError").innerHTML =
                        "Something went wrong. Please check the browser console";
                    return;
                });
        }
    }
}

function setScript() {
    let scriptName = document.getElementById("setScriptName").value;
    let scriptContent = document.getElementById("scriptArea").value;
    let updateNotes = document.getElementById("updateNotes").value;

    // check if license key is not set yet
    if (!licenseKey) {
        console.log("license key is not set!");
        alert("Please set your license key first!");
        return;
    }
    // check if script content is empty
    if (scriptContent == "") {
        alert("Please insert the script content first!");
        return;
    }
    // check if script Name is empty or invalid
    if (!scriptName.includes(".lua")) scriptName += ".lua"
    let validScript = false;
    for (let i = 0; i < scriptCollection.length; i++) {
        const element = scriptCollection[i];
        if (scriptCollection[i].name == scriptName) {
            if (scriptCollection[i].author != userName) {
                alert("You're not the author of this script!");
                return;
            } else {
                validScript = true;
            }
        }
    }
    if (!validScript) {
        alert("That's not a valid script name!");
        return;
    }
    // check if update notes are empty
    if (updateNotes == "") {
        alert( "Please provide some update notes!");
        return;
    }


    fetch("https://fantasy.cat/api.php?" + new URLSearchParams({
            key: licenseKey,
            software: "constellation",
            cmd: "setScriptContent",
            name: scriptName
        }), {
            method: "POST",
            body: new URLSearchParams({
                "value": scriptContent,
                "note": updateNotes
            })
        })
        .then(response => {
            response.text()
                .then(text => {
                    console.log(text);
                    // this is a dumb way to make a success message
                    if (text.includes(userName + " changed script " + scriptName +
                            " content to")) {
                        alert("Successfully set the content of " + scriptName);
                        return;
                    } else {
                        alert("Unexpected result. Please check the console");
                        return;
                    }
                })
                .catch(err => {
                    console.error(err);
                    alert("Something went wrong. Please check the browser console");
                    return;
                });
        })
        .catch(err => {
            console.error(err);
            alert( "Something went wrong. Please check the browser console");
            return;
        });
}