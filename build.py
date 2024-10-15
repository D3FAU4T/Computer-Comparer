import color
import platform
import subprocess

def build():
    os_type = platform.system()
    
    if os_type == 'Windows':
        command = [
            "pyinstaller",
            "--onefile",
            "--name", "Comparer",
            "--icon", "static/icon.ico",
            "--add-data", "templates;templates",
            "--add-data", "static;static",
            "--add-data", "color.py;.",
            "main.py"
        ]
    
    elif os_type == 'Linux':
        command = [
            "pyinstaller",
            "--onefile",
            "--name", "Comparer",
            "--add-data=templates:templates",
            "--add-data=static:static",
            "--add-data=color.py:.",
            "main.py"
        ]
        
    else:
        print(color.red(f'× Unsupported OS: {os_type}'))
        return
    
    try:
        subprocess.run(command)
        print(color.green('✓ Build successful for platform:'), color.yellow(os_type))
    except subprocess.CalledProcessError as err:
        print(color.red('× Build failed for platform:'), color.yellow(os_type))
        print(color.red('× Error:'), err)
        

if __name__ == '__main__':
    build()