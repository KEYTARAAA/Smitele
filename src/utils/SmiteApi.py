import requests

link = "https://smite.fandom.com/api.php?action=query&prop=revisions&titles=List_of_gods&rvslots=*&rvprop=content&format=json&formatversion=2"
f = requests.get(link)
print(f.text)