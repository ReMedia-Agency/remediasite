import os
import glob

root_files = ['index.html', 'about.html', 'contact.html', 'industries.html', 'results.html', 'services.html', 'why-remedia.html']
services_files = ['services/branding.html', 'services/digital-marketing.html', 'services/seo.html', 'services/website-design.html']

for f in root_files:
    if os.path.exists(f):
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
            
        content = content.replace(
            '<a href="contact.html">Contact</a>\n      </nav>',
            '<a href="contact.html">Contact</a>\n        <a href="login.html">Client Login</a>\n      </nav>'
        )
        content = content.replace(
            '<a href="contact.html">Contact</a>\n        <a href="contact.html" class="btn btn-primary"',
            '<a href="contact.html">Contact</a>\n        <a href="login.html">Client Login</a>\n        <a href="contact.html" class="btn btn-primary"'
        )
        
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)

for f in services_files:
    if os.path.exists(f):
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
            
        content = content.replace(
            '<a href="../contact.html">Contact</a>\n      </nav>',
            '<a href="../contact.html">Contact</a>\n        <a href="../login.html">Client Login</a>\n      </nav>'
        )
        content = content.replace(
            '<a href="../contact.html">Contact</a>\n        <a href="../contact.html" class="btn btn-primary"',
            '<a href="../contact.html">Contact</a>\n        <a href="../login.html">Client Login</a>\n        <a href="../contact.html" class="btn btn-primary"'
        )
        
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
print('Done!')
