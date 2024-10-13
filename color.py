def red(message: str):
    return f'\x1b[31m{message}\x1b[0m'

def green(message: str):
    return f'\x1b[32m{message}\x1b[0m'

def yellow(message: str):
    return f'\x1b[33m{message}\x1b[0m'

def blue(message: str):
    return f'\x1b[34m{message}\x1b[0m'

def purple(message: str):
    return f'\x1b[35m{message}\x1b[0m'

def cyan(message: str):
    return f'\x1b[36m{message}\x1b[0m'

def white(message):
    return f'\x1b[37m{message}\x1b[0m'
