from app import app as application
from app import record_loop
from multiprocessing import Process

p = Process(target=record_loop)
p.start()
app = application
p.join()
