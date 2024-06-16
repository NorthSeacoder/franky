import vscode from 'vscode';

// 导出一个Disposable类，实现vscode.Disposable接口
export class Disposable implements vscode.Disposable {
    // 声明一个disposables数组，用于存储可释放的对象
    private disposables: vscode.Disposable[] = [];
    // 声明一个disposed变量，用于标记是否已经释放
    private disposed: boolean = false;

    // 实现Disposable接口的dispose方法
    public dispose() {
        // 将disposed标记为true
        this.disposed = true;
        // 遍历disposables数组，调用每个对象的dispose方法
        this.disposables.forEach((disposable) => {
            try {
                disposable.dispose();
            } catch (_) {}
        });
        // 将disposables数组清空
        this.disposables = [];
    }

    // 注册一个可释放的对象
    public registerDisposable(disposable: vscode.Disposable) {
        // 将对象添加到disposables数组
        this.disposables.push(disposable);
    }
    // 注册多个可释放的对象
    protected registerDisposables(...disposables: vscode.Disposable[]) {
        // 将对象添加到disposables数组
        this.disposables.push(...disposables);
    }

    // 判断是否已经释放
    protected isDisposed() {
        // 返回disposed标记
        return this.disposed;
    }
}

// 导出一个函数，将传入的函数转换为vscode.Disposable接口
export function toDisposable(fn: () => void): vscode.Disposable {
    // 返回一个对象，实现vscode.Disposable接口
    return {
        // 实现Disposable接口的dispose方法
        dispose: fn
    };
}