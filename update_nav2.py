import os
import glob

# Rename the file if it exists
if os.path.exists('login.html'):
    os.rename('login.html', 'clientportal.html')

all_html_files = glob.glob('**/*.html', recursive=True)

for f in all_html_files:
    if os.path.exists(f):
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
            
        original_content = content
        
        # Replace links
        content = content.replace('href="login.html"', 'href="clientportal.html"')
        content = content.replace('href="../login.html"', 'href="../clientportal.html"')
        content = content.replace('>Client Login<', '>Client Portal<')
        
        if content != original_content:
            with open(f, 'w', encoding='utf-8') as file:
                file.write(content)
                
print('Renamed and updated links!')
